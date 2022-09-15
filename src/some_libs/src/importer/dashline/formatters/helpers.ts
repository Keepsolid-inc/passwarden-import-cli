const getLineBreak = (idx: number) => (idx !== 0 ? " \n " : "");

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const formatKey = (key: string) =>
  capitalizeFirstLetter(key).replace(/_/g, " ");
const getKey = (key: string, baseNoteKey?: string) =>
  key === baseNoteKey ? "" : `${formatKey(key)}: `;

export const formatNotes = (
  obj: Record<string, string | undefined>,
  baseNoteKey?: string,
) =>
  Object.entries(obj).reduce(
    (acc, [key, value], idx) =>
      value
        ? `${acc}${getLineBreak(idx)}${getKey(key, baseNoteKey)}${value}`
        : acc,
    "",
  );
