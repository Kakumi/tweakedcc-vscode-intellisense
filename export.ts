import path from "path";
import fs from "fs";
import axios from "axios";
import * as cheerio from "cheerio";

interface ResultMethods {
  label: string;
  detail: string;
  parameters: string[];
  documentation: string;
}

interface EventObject {
  name: string;
  description: string;
  url: string;
  returns: string[];
}

scrapeTweaked();

// Fonction pour récupérer les données de la page principale et visiter chaque lien
async function scrapeTweaked() {
  const baseUrl = "https://tweaked.cc";

  // Récupérer la page principale
  const { data: mainPage } = await axios.get(baseUrl);
  const $ = cheerio.load(mainPage);

  const sectionLinks = $(`a.sidebar-link`);
  const events: EventObject[] = [];

  for (let i = 0; i < sectionLinks.length; i++) {
    const link = sectionLinks[i].attribs.href;
    const pageUrl = baseUrl + "/" + link;

    if (!link.includes("event")) {
      continue;
    }

    console.log("reading event " + pageUrl);
    const eventObject = await scrapeEventData(pageUrl);
    if (eventObject) {
      events.push(eventObject);
    }
  }

  // Pour chaque lien dans la section, visiter la page
  for (let i = 0; i < sectionLinks.length; i++) {
    const link = sectionLinks[i].attribs.href;
    const pageUrl = baseUrl + "/" + link;

    if (
      link.includes("guide") ||
      link.includes("reference") ||
      link.includes("event")
    ) {
      continue;
    }

    await scrapeElementData(pageUrl, events);
  }
}

async function scrapeEventData(url) {
  try {
    const { data: pageData } = await axios.get(url);
    const $ = cheerio.load(pageData);

    const eventName = $("h1").text().trim().replace(/\./g, "_");
    const eventDesc = $("h1").next("p").text().replace("\n", "").trim();

    const returnValues: string[] = [];
    const returnDistinctValues: string[] = [];
    $('h2:contains("Return Values")')
      .next("ol")
      .find("li")
      .each((k, returnElem) => {
        for (const returnLine of $(returnElem).text().trim().split("\n")) {
          returnValues.push(returnLine);
          const parameterReturnLine = returnLine.split(" ")[0];
          if (!returnDistinctValues.includes(parameterReturnLine)) {
            returnDistinctValues.push(parameterReturnLine);
          }
        }
      });

    return {
      name: eventName,
      description: eventDesc,
      url: url,
      returns: returnValues,
    };
  } catch (error) {
    console.error("Error while scraping:", error);
  }
}

async function scrapeElementData(url, events: EventObject[]) {
  try {
    const { data: pageData } = await axios.get(url);
    const $ = cheerio.load(pageData);
    const definitions = $("dl.definition dt");
    const results: ResultMethods[] = [];

    const regexParameters = /^(\w+(\?)?[:|\s]\w+)/;

    const moduleName = $("h1").text().trim().replace(/\./g, "_");
    const moduleDesc = $("h1").next("p").text().replace("\n", "").trim();

    definitions.each((i, elem) => {
      const name = $(elem).find("a[name]").attr("name")!.replace("v:", "");
      const method = $(elem).find(".definition-name").text().trim();

      const description = $(elem).next("dd").find("p").first().text().trim();

      const parameters: string[] = [];
      const parametersVariables: string[] = [];
      $(elem)
        .next("dd")
        .find("ol.parameter-list li")
        .each((j, paramElem) => {
          const parameterLine = $(paramElem).text().trim();
          const match = parameterLine.match(regexParameters);
          if (match) {
            const formattedParameter = match[0].replace(" ", ": ");
            parametersVariables.push(formattedParameter);
            parameters.push(
              parameterLine.replace(match[0], `**${formattedParameter}**`)
            );
          } else {
            parametersVariables.push(parameterLine);
            parameters.push(parameterLine);
          }
        });

      const returnValues: string[] = [];
      const returnDistinctValues: string[] = [];
      $(elem)
        .next("dd")
        .find("ol.return-list li")
        .each((k, returnElem) => {
          for (const returnLine of $(returnElem).text().trim().split("\n")) {
            returnValues.push(returnLine);
            const parameterReturnLine = returnLine.split(" ")[0];
            if (!returnDistinctValues.includes(parameterReturnLine)) {
              returnDistinctValues.push(parameterReturnLine);
            }
          }
        });

      const usages: string[] = [];
      const usageList = $(elem)
        .next("dd")
        .find('h3:contains("Usage")')
        .next("ul");
      if (usageList.length) {
        usageList.find("li").each((i, elemLi) => {
          $(elemLi)
            .text()
            .trim()
            .split("\n")
            .forEach((line) => {
              usages.push(line);
            });
        });
      }

      const detail = `${name}(${parametersVariables.join(", ")}): ${
        returnDistinctValues.length == 0
          ? "void"
          : returnDistinctValues.join(" | ")
      }`;
      let documentation = `${description}`;
      if (parameters.length > 0) {
        documentation += `\n\n**Parameters:**`;
        for (const parameter of parameters) {
          documentation += `\n- ${parameter}`;
        }
      }

      if (name.startsWith("pullEvent")) {
        documentation += `\n\n**Events:**`;
        for (const event of events) {
          documentation += `\n- \`${event.name}\`: ${event.description}`;
          documentation += `\n\t- ${event.url}`;
          documentation += `\n\t- **Returns:**`;
          for (const eventReturn of event.returns) {
            documentation += `\n\t\t- ${eventReturn}`;
          }
        }
      }

      if (returnValues.length > 0) {
        documentation += `\n\n**Returns:**`;
        for (const returnValue of returnValues) {
          documentation += `\n- ${returnValue}`;
        }
      }

      if (usages.length > 0) {
        documentation += `\n\n**Usage:**`;
        let close = false;
        for (let i = 0; i < usages.length; i++) {
          if (i == 1) {
            documentation += `\n\n\`\`\``;
            close = true;
          }

          documentation += `\n\n${usages[i]}`;
        }

        if (close) {
          documentation += `\n\n\`\`\``;
        }
      }

      const result = {
        label: name,
        detail: detail,
        parameters: parametersVariables,
        documentation: documentation,
      };

      results.push(result);
    });

    const replacements = {
      templateModuleName: moduleName,
      templateModuleDesc: moduleDesc,
      templateModuleArray: JSON.stringify(results),
    };

    copyAndReplaceFile(`${moduleName}.ts`, replacements);

    return results;
  } catch (error) {
    console.error("Error while scraping:", error);
  }
}

async function copyAndReplaceFile(destFileName, replacements) {
  try {
    const srcFilePath = path.join(__dirname, "template.ts");
    const dirPath = path.join(__dirname, "client", "src", "modules");
    const destFilePath = path.join(dirPath, destFileName);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    let fileContent = fs.readFileSync(srcFilePath, "utf8");

    for (const [searchValue, newValue] of Object.entries(replacements)) {
      const regex = new RegExp(searchValue, "g");
      fileContent = fileContent.replace(regex, newValue as string);
    }

    fs.writeFileSync(destFilePath, fileContent);
    console.log(`Module saved at ${destFileName}`);
  } catch (error) {
    console.error("Error while copying the module :", error);
  }
}
