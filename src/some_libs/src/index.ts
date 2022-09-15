const importFromLastPass = require("./importer/LastPassImporter");
const {
  importFromOnePasswordPif,
  importFromOnePasswordTxt,
} = require("./importer/1PasswordImporter");
const importFromDashlaneJson = require("./importer/DashlaneImporter");
const importFromDashlaneZIP = require("./importer/DashlaneImporterZIP");
const importFromDashlaneCSV = require("./importer/DashlaneImporterCSV");
const schemaImport = require("./importer/schemaImporter");

const ChromeSchema = require("../schemas/chrome_schema.json");
const FirefoxSchema = require("../schemas/firefox_schema.json");
const EnpassSchema = require("../schemas/enpass_schema.json");

function importer({ file, resource, ext, input }: any) {
  switch (resource) {
    case "1Password":
      if (ext === "text/plain") {
        return importFromOnePasswordTxt(file);
      } else if (ext === "1pif") {
        return importFromOnePasswordPif(file);
      }
      return null;
    case "LastPass":
      return importFromLastPass(file);
    case "Dashlane":
      if (ext === "application/json") {
        return importFromDashlaneJson(file);
      } else if (ext === "application/zip") {
        return importFromDashlaneZIP(file);
      } else if (ext === "text/csv") {
        return importFromDashlaneCSV(file, input);
      }
      return null;
    case "Enpass":
      return schemaImport(file, EnpassSchema);
    case "Chrome":
      return schemaImport(file, ChromeSchema, ["name"]);
    case "Firefox":
      return schemaImport(file, FirefoxSchema);
  }
}

exports = module.exports = importer;
