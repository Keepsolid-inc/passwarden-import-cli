const RESOURCES = [
  {
    type: "Chrome",
    ext: ["text/csv"],
  },
  {
    type: "Firefox",
    ext: ["text/csv"],
  },
  {
    type: "LastPass",
    ext: ["text/csv"],
  },
  {
    type: "1Password",
    ext: ["text/plain", "1pif"],
  },
  {
    type: "Dashlane",
    ext: ["application/json", "application/zip", "text/csv"],
  },
  {
    type: "Enpass",
    ext: ["application/json"],
  },
];

const RESOURCES_TYPES = RESOURCES.map(({ type }) => type);

export { RESOURCES, RESOURCES_TYPES };
