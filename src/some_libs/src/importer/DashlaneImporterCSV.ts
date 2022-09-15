import csvparse from "csv-parse/lib/sync";
import { formatters } from "./dashline/formatters";
const importFromDashlaneCSV = (file: any, input: string) => {
  const fileName = input.split("/").pop()?.split(".")[0].toLowerCase();
  const data = csvparse(new TextDecoder().decode(file), {
    columns: true,
  });

  // @ts-ignore because the file name might be wrong
  const formatter = formatters[fileName];
  if (!formatter) {
    console.log(
      "Invalid filename\n Must contain one of " +
        Object.keys(formatters).join(", "),
    );
    return false;
  }

  return formatter(data);
};
export = (module.exports = importFromDashlaneCSV);
