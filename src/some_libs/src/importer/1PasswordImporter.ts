const convertPifToJSON = require("./tools/1passwordPif");
const convertTxtToJSON = require("./tools/1passwordTxt");

function importFromOnePasswordPif(contents: any) {
  return convertPifToJSON(contents);
}

function importFromOnePasswordTxt(contents: string) {
  return convertTxtToJSON(contents);
}

export = (module.exports = {
  importFromOnePasswordPif,
  importFromOnePasswordTxt,
});
