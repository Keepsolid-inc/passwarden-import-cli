const recordsByCategory: any = {
  "002": {
    "cardholder name": "cardholder_name",
    number: "card_number",
    type: "type",
    PIN: "pin",
    "verification number": "security_code",
    "phone (toll free)": "toll_free",
    "phone (intl)": "phone_number",
    website: "website",
    "credit limit": "cash_limit",
    "expiry date": "expiration_date",
  },
  "101": {
    "bank name": "bank_name",
    SWIFT: "swift",
    IBAN: "iban",
    PIN: "pin",
    phone: "phone_number",
    address: "address",
  },
  "102": {},
  "006": {},
  "103": {
    "full name": "full_name",
    address: "address",
    "date of birth": "date_of_birth",
    sex: "gender",
    number: "drivers_license_number",
    "expiry date": "expiration_date",
  },
  "111": {
    type: "server_type",
    username: "login",
    server: "url",
    "port number": "port",
    password: "password",
    security: "server_type",
    "SMTP server": "smtp_server",
    "provider's website": "mail_server",
  },
  "004": {
    "first name": "first_name",
    "last name": "last_name",
    sex: "gender",
    "birth date": "date_of_birth",
    company: "company",
    "default phone": "phone_number",
    email: "email",
  },
  "001": {
    website: "website",
    username: "login",
    password: "password",
  },
  "105": {},
  "104": {
    "full name": "full_name",
    "valid from": "date_of_issue",
    expires: "expiration_date",
  },
  "005": {
    website: "website",
    username: "login",
    password: "password",
  },
  "106": {
    "issuing country": "place_of_issue",
    number: "passport_number",
    "full name": "full_name",
    sex: "gender",
    nationality: "nationality",
    "date of birth": "date_of_birth",
    "issued on": "date_of_issue",
    "expiry date": "expiration_date",
  },
  "107": {},
  "003": {},
  "110": {},
  "108": {
    name: "full_name",
    number: "social_security_number",
  },
  "100": {
    version: "version",
    "license key": "license_key",
    "licensed to": "product_name",
    "registered email": "registered_email",
    company: "company",
    publisher: "login",
    website: "website",
    "support email": "registered_email",
    "purchase date": "issue_date",
    "order number": "password",
  },
  "109": {
    "base station name": "login",
    "base station password": "password",
    "server / IP address": "ssid",
    "network name": "management_login",
    "wireless security": "wireless_security_type",
    "wireless network password": "management_password",
  },
};

const defaultRecordsByCategory: any = {
  title: "title",
  notesPlain: "notes",
};

function convertTxtToJSON(contents: string) {
  const contentList = contents.trim().split("\r\n\r\n");

  return contentList.map((textData: string) => {
    const categoryMatch: any = textData.matchAll(/(.*?)=(.*)\r\n/gm);
    let record_type: string = "";
    let category: string = "";
    const components: any = {};
    let fieldNameMap: any = {};

    [...categoryMatch].forEach((r: any[]) => {
      if (r && r.length) {
        let fieldName = "";

        if (r[1] === "category") {
          switch (r[2]) {
            case "002":
              record_type = "5";
              category = "1";
              break;
            case "101":
              record_type = "6";
              category = "1";
              break;
            case "103":
              record_type = "2";
              category = "0";
              break;
            case "111":
              record_type = "9";
              category = "2";
              break;
            case "004":
              record_type = "3";
              category = "0";
              break;
            case "001":
              record_type = "7";
              category = "2";
              break;
            case "104":
              record_type = "0";
              category = "0";
              break;
            case "106":
              record_type = "1";
              category = "0";
              break;
            case "005":
              record_type = "7";
              category = "2";
              break;
            case "108":
              record_type = "4";
              category = "0";
              break;
            case "100":
              record_type = "8";
              category = "2";
              break;
            case "109":
              record_type = "11";
              category = "2";
              break;
            default:
              record_type = "12";
              category = "3";
          }

          fieldNameMap = {
            ...defaultRecordsByCategory,
            ...recordsByCategory[r[2]],
          };
        } else {
          fieldName = fieldNameMap[r[1]];
        }

        switch (r[1]) {
          case "category":
          case "uuid":
          case "ainfo":
          case "scope":
          case "autoSubmit":
            break;
          case "notes":
            components.notes += `${r[2]}\n`;
            break;
          default:
            if (fieldName) {
              components[fieldName] = r[2];
            } else {
              components.notes += `${[r[1]]}: ${r[2]}\n`;
            }
            break;
        }
      }
    });

    return { record_type, category, components };
  });
}

export = (module.exports = convertTxtToJSON);
