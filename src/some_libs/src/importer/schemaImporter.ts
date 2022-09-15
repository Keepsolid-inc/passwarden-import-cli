import { DateTime } from "luxon";
import csvparse from "csv-parse/lib/sync";

const schemaImport = (
  contents: any,
  schema: any,
  excludeKeysInNotes: string[] = [],
) => {
  try {
    let res: any = [];
    let data: any;

    if (schema.INPUT_FILE_EXTENSION === "json") {
      data = JSON.parse(contents);
    }
    if (schema.INPUT_FILE_EXTENSION === "csv") {
      data = csvparse(contents, { columns: true });
    }

    if (data) {
      let mappingStructure = data[schema.ADDITIONAL_KEY_FOR_PARSE] || data; //проверка на существование вложенного ключа
      if (schema.PREPARSE_ELEMENT_TYPE === "array") {
        // let mappingArray = data[schema.ADDITIONAL_KEY_FOR_PARSE] || data; //проверка на существование вложенного ключа

        res = mappingStructure.map((raw: any) => {
          return parseRowData(raw, schema, excludeKeysInNotes);
        });
      }
      if (schema.PREPARSE_ELEMENT_TYPE === "object") {
        for (let rawItem in mappingStructure) {
          data[rawItem].forEach((item: any) => {
            item[schema.RECORD_TYPE_KEY.key] = rawItem;
            res.push(parseRowData(item, schema, excludeKeysInNotes));
          });
        }
      }

      res = pickFirstElement(res);
      return res.map((item: any) => ({
        ...item,
        components: {
          ...item.components,
          notes: item.components.notes.trim(),
        },
      }));
    }
  } catch (_) {}
};

function parseRowData(item: any, schema: any, excludeKeysInNotes: string[]) {
  try {
    let rawItem = { ...item };
    const record: any = {
      record_type: 12,
      category: 3,
      components: {
        title:
          rawItem.title ||
          rawItem?.name ||
          rawItem.hostname ||
          rawItem.url ||
          "Untitled",
        notes: [],
      },
    };

    if (schema.REQUIRES_JSON_PARSING) {
      if (/NoteType/i.test(rawItem[schema.REQUIRES_JSON_PARSING]))
        // проверка, чтобы не парсить заметки
        parseCsvString(rawItem[schema.REQUIRES_JSON_PARSING], rawItem);
      delete rawItem[schema.REQUIRES_JSON_PARSING];
    }

    let formattedValue;
    let foundRecordType = Object.keys(schema.fields).find((recordType: any) => {
      return (
        (schema.fields as any)[recordType].keys &&
        (schema.fields as any)[recordType].keys.some((regex: any) =>
          new RegExp(regex, "i").test(rawItem[schema.RECORD_TYPE_KEY.key]),
        )
      );
    });
    let fields = {};

    if (schema.DEFAULT_CATEGORY) {
      foundRecordType = schema.DEFAULT_CATEGORY; // Проверка на наличие дефолтной категории для записей, для импорта с браузеров - логин
    }

    if (foundRecordType) {
      record.record_type = (schema.fields as any)[foundRecordType].record_type;
      record.category = (schema.fields as any)[foundRecordType].category;
      fields = (schema.fields as any)[foundRecordType]["fields"];
    }

    /**
     * вариант для Enpass
     */
    if (schema.FIRST_LEVEL_KEY?.isArray) {
      /**
       * Проверка на существование ключа "fields"
       */
      if (rawItem[schema.FIRST_LEVEL_KEY.key]) {
        rawItem[schema.FIRST_LEVEL_KEY.key].forEach((rawItemRecord: any) => {
          let foundAlias = (fields as any)[
            rawItemRecord[schema.RAW_ITEM_TYPE_KEY.key]
          ];

          if (foundAlias) {
            formattedValue = rawItemRecord[schema.RAW_ITEM_VALUE_KEY.key];

            if (foundAlias.convertToDateFromString) {
              let formatted_date = DateTime.fromFormat(
                formattedValue,
                "dd/MM/yyyy",
              ).toSeconds();
              // new Date(formattedValue).getTime() / 1000;
              if (isNaN(formatted_date as number)) {
                formattedValue = 0;
              } else {
                formattedValue = formatted_date;
              }
            }
            fillRecord(record.components, foundAlias.pwKey, formattedValue);
          } else {
            record.components["notes"].push(
              `${rawItemRecord["label"]}: ${
                rawItemRecord[schema.RAW_ITEM_VALUE_KEY.key]
              } \n`,
            );
          }
        });
      }
      // else {
      //     record.components.notes.push(rawItem.note);
      // }
      if (rawItem.note) {
        record.components.notes.push(rawItem.note + "\n");
      }
    } else {
      /**
       * вариант для Dashlane
       */
      for (let key in rawItem) {
        let foundAlias = (fields as any)[key];
        if (foundAlias) {
          formattedValue = rawItem[key];
          if (foundAlias.convertToDateFromString) {
            let formatted_date = new Date(formattedValue).getTime() / 1000;
            if (isNaN(formatted_date)) {
              formattedValue = 0;
            } else {
              formattedValue = formatted_date;
            }
          }
          fillRecord(record.components, foundAlias.pwKey, formattedValue);

          // record.components[foundAlias["pwKey"]] = formattedValue;
        } else {
          const formatData = (key: string, value: string) => {
            if (!key.includes("time")) return value;
            return new Date(Number(value)).toLocaleString(undefined, {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            });
          };

          if (!excludeKeysInNotes.includes(key)) {
            record.components["notes"].push(
              `${key}: ${formatData(key, rawItem[key])} \n`,
            );
          }
        }
      }
    }

    return record;
  } catch (e) {
    console.error(e);
  }
}

function fillRecord(obj: any, key: string, item: string) {
  if (Array.isArray(obj[key])) {
    obj[key].push(item);
  } else {
    obj[key] = [item];
  }
}

function parseCsvString(str: string, targetObject: any) {
  let res = str
    .split("\n")
    .filter(Boolean)
    .map((item: any) => {
      let [key, value] = item.split(":");
      if (value) targetObject[key] = value.replace(/\n|\r/g, "");
    });
}

function pickFirstElement(items: any) {
  items.forEach((item: any) => {
    for (let key in item.components) {
      if (Array.isArray(item.components[key]) && key !== "notes")
        item.components[key] = item.components[key][0];
      if (key === "notes") {
        item.components[key] = item.components[key].reduce(
          (val: any, acc: string) => (acc += val),
          "",
        );
      }
    }
  });
  return items;
}

export = (module.exports = schemaImport);
