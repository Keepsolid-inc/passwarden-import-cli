import csvparse from "csv-parse/lib/sync";
import uzip from "uzip";
import { formatters, IAllData, IFileName } from "./dashline/formatters";

type IFilesEntries = [IFileName, Uint8Array][];

const importFromDashlaneZIP = (file: any) => {
  const files = uzip.parse(file);

  const parseFile = <N extends IFileName, T = IAllData[N]>(file: Uint8Array) =>
    csvparse(new TextDecoder().decode(file), {
      columns: true,
    });

  const formatTypeName = (str: string) => str.toLowerCase().split(".")[0];

  const allData = (Object.entries(files) as IFilesEntries).reduce(
    (acc: IAllData, [key, value]) => ({
      ...acc,
      [formatTypeName(key)]: parseFile<typeof key>(value),
    }),
    {
      securenotes: [],
      ids: [],
      credentials: [],
      personalinfo: [],
      payments: [],
    },
  );

  // @ts-ignore
  return Object.keys(allData).flatMap((key) => formatters[key](allData[key]));
};

export = (module.exports = importFromDashlaneZIP);
