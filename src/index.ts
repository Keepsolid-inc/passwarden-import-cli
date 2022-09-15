#!/usr/bin/env node

import { Command, Option } from "commander";
import fs from "fs";
import { RESOURCES_TYPES } from "./constans";
import { getExt, getFile, isValidFilePath, isValidType } from "./helpers";
import path from "path";

const importer = require("./some_libs/src/index"); // fixme

const program = new Command();

program
  .version("1.0.0")
  .addOption(
    new Option("-r, --resource <resource>", "type import").choices(
      RESOURCES_TYPES,
    ),
  )
  .requiredOption("-i, --input <input>", "input file path")
  .requiredOption("-o, --output <output>", "output file path with name");

program.parse(process.argv);

const { resource, input, output } = program.opts();

(async () => {
  try {
    const file = await getFile(input);
    const ext = getExt(input);

    if (!isValidType(resource, ext)) return console.log("invalid file");

    if (!isValidFilePath(output)) return console.log("Invalid output filepath");

    const json = importer({ file, resource, ext, input });

    if (!json) return console.log("some error");

    fs.writeFile(
      `${path.resolve(__dirname, "..", output)}.json`,
      JSON.stringify(json),
      (err) => console.log(err ? err : "Success!!"),
    );
  } catch (e) {
    console.log(e);
  }
})();
