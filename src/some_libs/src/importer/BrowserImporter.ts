import csvparse from "csv-parse/lib/sync";

function plaintextReduser(data: any) {
  if (data) {
    try {
      let jsonNotes: any = {};
      if (typeof data === "string") {
        jsonNotes = JSON.parse(data);
      } else if (typeof data === "object") {
        jsonNotes = data;
      }

      return Object.keys(jsonNotes).reduce(
        (accumulator: any, key: any): any => {
          if (typeof jsonNotes[key] === "object") {
            return accumulator + `${key}:\n${plaintextReduser(jsonNotes[key])}`;
          } else {
            return accumulator + `${key}: ${jsonNotes[key]}\n`;
          }
        },
        "",
      );
    } catch (_e) {}
  }
  return "";
}

const importFromBrowserChrome = (contents: any) => {
  return csvparse(contents, { columns: true }).map((item: any) => {
    const record_type: number = 7;
    const category: number = 2;
    const components: any = {};

    if (item.name) {
      components.title = item.name;
    }
    if (item.url) {
      components.url = item.url;
    }
    if (item.username) {
      components.username = item.username;
    }
    if (item.password) {
      components.password = item.password;
    }

    return { record_type, category, components };
  });
};

const importFromBrowserFirefox = (contents: any) => {
  return csvparse(contents, { columns: true }).map((item: any) => {
    let record_type: number = 7;
    let category: number = 2;
    const components: any = {};

    if (item?.hostname === "chrome://FirefoxAccounts") {
      record_type = 12;
      category = 3;

      const notes = plaintextReduser(item?.password);

      components.notes = notes || "";
    }

    if (item.hostname) {
      components.title = item.hostname.replace(/http(s?):\/\//, "");
      components.url = item.hostname;
    }
    if (item.url) {
      components.title = item.url.replace(/http(s?):\/\//, "");
      components.url = item.url;
    }
    if (item.username) {
      components.username = item.username;
    }
    if (item.password && record_type !== 12) {
      components.password = item.password;
    }

    return { record_type, category, components };
  });
};

export { importFromBrowserChrome, importFromBrowserFirefox };
