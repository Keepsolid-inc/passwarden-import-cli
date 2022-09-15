import { isArray } from "lodash";
import { DateTime } from "luxon";

const setNotes = (key: string, value: string | undefined | number) =>
  value ? `${key}: ${value}\n` : "";

const RECORD_TYPES = [
  {
    type: /.CreditCard/i,
    record_type: 5,
    category: 1,
  },
  {
    type: /.Password/i,
    record_type: 7,
    category: 1,
  },
  {
    type: /.License/i,
    record_type: 8,
    category: 2,
  },
  {
    type: /.Email/i,
    record_type: 9,
    category: 2,
  },
  {
    type: /.SsnUS/i,
    record_type: 4,
    category: 0,
  },
  {
    type: /.Passport/i,
    record_type: 1,
    category: 0,
  },
  {
    type: /.Router/i,
    record_type: 11,
    category: 2,
  },
  {
    type: /.InstantMessenger/i,
    record_type: 12,
    category: 3,
  },
  {
    type: /.iTunes/i,
    record_type: 12,
    category: 3,
  },
  {
    type: /.ISP/i,
    record_type: 12,
    category: 3,
  },
  {
    type: /.SecureNote/i,
    record_type: 12,
    category: 3,
  },
  {
    type: /.Amazon/i,
    record_type: 12,
    category: 3,
  },
  {
    type: /.RewardProgram/i,
    record_type: 12,
    category: 3,
  },
  {
    type: /.UnixServer/i,
    record_type: 12,
    category: 3,
  },
  {
    type: /.HuntingLicense/i,
    record_type: 12,
    category: 3,
  },
  {
    type: /.Database/i,
    record_type: 12,
    category: 3,
  },
  {
    type: /.FTP/i,
    record_type: 12,
    category: 3,
  },
  {
    type: /.Regular/i,
    record_type: 12,
    category: 3,
  },
  {
    type: /.GenericAccount/i,
    record_type: 7,
    category: 2,
  },
  {
    type: /.DotMac/i,
    record_type: 12,
    category: 3,
  },
  {
    type: /.Identity/i,
    record_type: 3,
    category: 0,
  },
  {
    type: /.BankAccount/i,
    record_type: 6,
    category: 1,
  },
  {
    type: /.DriversLicense/i,
    record_type: 2,
    category: 0,
  },
  {
    type: /.Membership/i,
    record_type: 12,
    category: 3,
  },
  {
    type: /.WebForm/i,
    record_type: 7,
    category: 3,
  },
];

const recordsByCategory: any = {
  "0": {
    "full name": "full_name",
    "valid from": "date_of_issue",
    expires: "expiration_date",
  },
  "1": {
    issuing_country: "issuing_authority",
    number: "passport_number",
    fullname: "full_name",
    sex: "gender",
    nationality: "nationality",
    birthdate_yy: "date_of_birth",
    issue_date_yy: "date_of_issue",
    expiry_date_yy: "expiration_date",
    type: "passport_type",
  },
  "2": {
    fullname: "full_name",
    address: "address",
    birthdate_yy: "date_of_birth",
    sex: "gender",
    number: "drivers_license_number",
    expiry_date_yy: "expiration_date",
    class: "license_class",
    country: "country",
  },

  "3": {
    firstname: "first_name",
    lastname: "last_name",
    sex: "gender",
    birthdate_yy: "date_of_birth",
    company: "company",
    defphone: "phone_number",
    email: "email",
    address: "address",
  },
  "4": {
    name: "full_name",
    number: "social_security_number",
  },
  "5": {
    bank: "bank_name",
    cardholder: "cardholder_name",
    ccnum: "card_number",
    cvv: "security_code",
    expiry_yy: "expiration_date",
    type: "type",
    phone: "phone_number",
    pin: "pin",
    website: "url",
    phoneLocal: "phone_number",
  },
  "6": {
    bankName: "bank_name",
    swift: "swift",
    iban: "iban",
    routingNo: "routing_number",
    accountNo: "account_number",
    telephonePin: "pin",
    owner: "name_on_account",
    accountType: "type",
  },
  "7": {
    website: "url",
    username: "username",
    password: "password",
  },
  "8": {
    version: "version",
    reg_code: "license_key",
    reg_name: "licensed_to",
    reg_email: "registered_email",
    publisher_name: "product_name",
    publisher_website: "url",
    order_date: "issue_date",
    company: "company",
  },
  "9": {
    pop_type: "server_type",
    pop_username: "username",
    pop_password: "password",
    pop_security: "server_type",
    smtp_server: "outgoing_mail_server",
    smtp_port: "outgoing_mail_server_port",
    provider_website: "url",
    pop_server: "incoming_mail_server",
    pop_port: "incoming_mail_server_port",
  },
  "11": {
    title: "title",
    name: "router_management_login",
    password: "router_management_password",
    network_name: "ssid",
    wireless_security: "wireless_security_type",
    wireless_password: "wireless_network_password",
    server: "router_management_url",
  },
  "12": {},
};

const ONEPASS_SPACER = /^\*\*\*.+/;

function convertPifToJSON(onePifRaw: any) {
  return onePifRaw
    .toString()
    .split(/\r\n|\n/)
    .map((line: any) => line.trim())
    .filter(
      (line: any) => line.length > 0 && ONEPASS_SPACER.test(line) !== true,
    )
    .map((line: any) => {
      let jsonData = null;
      try {
        jsonData = JSON.parse(line);
      } catch (e) {
        console.log("e");
      }

      if (jsonData) {
        return onePasswordItemToEntry(jsonData);
      }
    });
}

function onePasswordItemToEntry(rawItem: any) {
  const record: any = {
    record_type: 12,
    category: 3,
    components: {
      title: rawItem.title || "",
      notes: "",
    },
  };

  RECORD_TYPES.forEach((item) => {
    if (item.type.test(rawItem.typeName)) {
      record.record_type = item.record_type;
      record.category = item.category;
    }
  });

  const fieldsByCategory = recordsByCategory[record.record_type];

  Object.keys(rawItem.secureContents).forEach((key: string) => {
    if (key === "sections") {
      return;
    }
    const fieldName = fieldsByCategory[key];

    const pswExcludeKeys = [
      "date_of_birth",
      "expiration_date",
      "date_of_issue",
    ];
    const onePassExcludeKeys = [
      "expiry_mm",
      "expiry_date_mm",
      "expiry_date_dd",
      "birthdate_dd",
      "birthdate_mm",
      "issue_date_mm",
      "issue_date_dd",
      "validFrom_mm",
      "member_since_mm",
      "valid_from_mm",
      "valid_from_dd",
      "expires_mm",
      "valid_from_dd",
      "member_since_mm",
      "order_date_mm",
      "order_date_dd",
      "expires_dd",
    ];
    const addressFields = [
      "region",
      "country",
      "state",
      "zip",
      "city",
      "address1",
    ];
    if (fieldName) {
      if (fieldName === "date_of_birth") {
        record.components[fieldName] = dateParser(
          rawItem.secureContents,
          "birthdate",
          true,
        );
      } else if (fieldName === "expiration_date") {
        if (rawItem.secureContents.expiry_date_yy) {
          record.components[fieldName] = dateParser(
            rawItem.secureContents,
            "expiry_date",
            true,
          );
        } else if (rawItem.secureContents.expiry_yy) {
          record.components[fieldName] = dateParser(
            rawItem.secureContents,
            "expiry",
            true,
          );
        }
      } else if (fieldName === "date_of_issue") {
        record.components[fieldName] = dateParser(
          rawItem.secureContents,
          "issue_date",
          true,
        );
      } else if (!pswExcludeKeys.includes(fieldName)) {
        record.components[fieldName] = rawItem.secureContents[key];
      }
    } else if (!onePassExcludeKeys.includes(key)) {
      if (isArray(rawItem.secureContents[key])) {
        if (key === "URLs") {
          record.components.url = rawItem.secureContents[key][0].url;
        } else if (key === "fields") {
          const username = rawItem.secureContents[key].find((item: any) => {
            return item.name === "username";
          });
          if (username) {
            record.components.username = username.value;
          }

          const email = rawItem.secureContents[key].find((item: any) => {
            return item.name === "email";
          });
          if (email) {
            record.components.username = email.value;
          }

          const password = rawItem.secureContents[key].find((item: any) => {
            return item.name === "password";
          });
          if (password) {
            record.components.password = password.value;
          }

          const master = rawItem.secureContents[key].find((item: any) => {
            return item.name === "master-password";
          });
          if (master) {
            record.components.password = master.value;
          }

          rawItem.secureContents[key].forEach((item: any) => {
            record.components.notes += setNotes(item.name, item.value);
          });
        }
        if (
          key !== "fields" &&
          (key !== "URLs" || rawItem.secureContents[key]?.length > 1)
        ) {
          record.components.notes += `${key}: [\n`;
          rawItem.secureContents[key].forEach((item: any) => {
            Object.keys(item).forEach((itemKey: any) => {
              record.components.notes += setNotes(itemKey, item[itemKey]);
            });
          });
          record.components.notes += `]\n`;
        }
      } else if (addressFields.includes(key)) {
        if (!record.components.address) {
          record.components.address = " ";
        }
        record.components.address += `${key}: ${rawItem.secureContents[key]}, `;
      } else if (key === "validFrom_yy") {
        record.components.notes += setNotes(
          "Valid from",
          dateParser(rawItem.secureContents, "validFrom", false),
        );
      } else if (key === "member_since_yy") {
        record.components.notes += setNotes(
          "Member since",
          dateParser(rawItem.secureContents, "member_since", false),
        );
      } else if (key === "expiry_date_yy") {
        record.components.notes += setNotes(
          "Expires",
          dateParser(rawItem.secureContents, "expiry_date", false),
        );
      } else if (key === "valid_from_yy") {
        record.components.notes += setNotes(
          "Valid from",
          dateParser(rawItem.secureContents, "valid_from", false),
        );
      } else if (key === "expires_yy") {
        record.components.notes += setNotes(
          "Expires",
          dateParser(rawItem.secureContents, "expires", false),
        );
      } else if (key === "member_since_yy") {
        record.components.notes += setNotes(
          "Member since",
          dateParser(rawItem.secureContents, "member_since", false),
        );
      } else if (key === "order_date_yy") {
        record.components.notes += setNotes(
          "Order date",
          dateParser(rawItem.secureContents, "order_date", false),
        );
      } else {
        record.components.notes += setNotes(key, rawItem.secureContents[key]);
      }
    }
  });

  record.components.notes = record.components.notes.trim();
  return record;
}

function dateParser(contents: any, dateName: string, toTs: boolean = false) {
  const dateDayKey = dateName + "_dd";
  const dateMonthKey = dateName + "_mm";
  const dateYearKey = dateName + "_yy";
  const day = contents[dateDayKey];
  const month = contents[dateMonthKey];
  const year = contents[dateYearKey];
  if (Number(year) < 1 || Number(year) > 9998) {
    return "";
  }
  let res = null;
  if (day) {
    res = DateTime.fromObject({ year: year, month: month, day: day });
  } else {
    res = DateTime.fromObject({ year: year, month: month });
  }
  if (toTs) {
    res = res.toSeconds();
  } else if (day) {
    res = res.toFormat("MMMM d, yyyy");
  } else {
    res = res.toFormat("MMMM/yyyy");
  }
  return res;
}

export = (module.exports = convertPifToJSON);
