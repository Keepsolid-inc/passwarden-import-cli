import { RESOURCES } from "./constans";
import fs from "fs";
import path from "path";

const mime = require("mime");

export const getExt = (file: string) =>
  mime.getType(file) || file.toString().split(".").pop();
export const getFile = async (path: string) => fs.promises.readFile(path);
export const isValidType = (resource: string, ext: any) =>
  RESOURCES.some((item) => item.type === resource && item.ext.includes(ext));

export const mathOutput = (output: string) => {
  const filename = [...output.split("/")].pop() || "";
  const pathName = output.substr(0, output.length - filename.length);
  return { filename, pathName };
};

export const isValidFilePath = (fullPath: string) => {
  const { pathName } = mathOutput(fullPath);
  const stats = fs.statSync(path.resolve(__dirname, "..", pathName));
  return stats.isDirectory();
};
