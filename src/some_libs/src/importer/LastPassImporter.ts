import csvparse from "csv-parse/lib/sync";
import { DateTime } from "luxon";

function lastPassDateParser(date: string) {
  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (date) {
    const tmp = date.split(",");
    if (tmp?.length && tmp[0] && tmp[1]) {
      if (tmp[2]) {
        const parsedTmp = DateTime.fromObject({
          year: +tmp[2],
          month: monthArr.indexOf(tmp[0]) + 1,
          day: +tmp[1],
        }).toSeconds();
        return parsedTmp;
      } else {
        const parsedTmp = DateTime.fromObject({
          year: +tmp[1],
          month: monthArr.indexOf(tmp[0]) + 1,
        }).toSeconds();
        return parsedTmp;
      }
    }
  }
  return 0;
}

function wifiPasswordParser(extra: any[]) {
  const result: any = {};
  result.notes = "";

  extra.forEach((item) => {
    const itemArray = item.split(":");
    const fieldName = itemArray[0].trim();
    const fieldData = itemArray.slice(1).join(":").trim();

    switch (fieldName) {
      case "SSID":
        result.ssid = fieldData;
        break;

      case "Password":
        result.wireless_network_password = fieldData;
        break;

      case "Encryption":
        result.wireless_security_type = fieldData;
        break;

      default:
        if (fieldName === "Notes") {
          result.notes += `${fieldData}\n`;
        } else if (fieldData && fieldName !== "Language") {
          result.notes += `${fieldName}: ${fieldData}\n`;
        }
        break;
    }
  });

  return result;
}

function emailAccountParser(extra: any[]) {
  const result: any = {};
  result.notes = "";

  extra.forEach((item) => {
    const itemArray = item.split(":");
    const fieldName = itemArray[0].trim();
    const fieldData = itemArray.slice(1).join(":").trim();

    switch (fieldName) {
      case "Username":
        result.username = fieldData;
        break;

      case "Password":
        result.password = fieldData;
        break;

      case "SMTP Server":
        result.outgoing_mail_server = fieldData;
        break;

      case "SMTP Port":
        result.outgoing_mail_server_port = fieldData;
        break;

      default:
        if (fieldName === "Notes") {
          result.notes += `${fieldData}\n`;
        } else if (fieldData && fieldName !== "Language") {
          result.notes += `${fieldName}: ${fieldData}\n`;
        }
        break;
    }
  });

  return result;
}

function softwareLicenseParser(extra: any[]) {
  const result: any = {};
  result.notes = "";

  extra.forEach((item) => {
    const itemArray = item.split(":");
    const fieldName = itemArray[0].trim();
    const fieldData = itemArray.slice(1).join(":").trim();

    switch (fieldName) {
      case "Licensee":
        result.licensed_to = fieldData;
        break;

      case "Support Email":
        result.registered_email = fieldData;
        break;

      case "Version":
        result.version = fieldData;
        break;

      case "License Key":
        result.license_key = fieldData;
        break;

      case "Publisher":
        result.product_name = fieldData;
        break;

      case "Website":
        result.url = fieldData;
        break;

      default:
        if (fieldName === "Notes") {
          result.notes += `${fieldData}\n`;
        } else if (fieldData && fieldName !== "Language") {
          result.notes += `${fieldName}: ${fieldData}\n`;
        }
        break;
    }
  });

  return result;
}

function passwordParser(extra: any[]) {
  const result: any = {};
  result.notes = "";

  extra.forEach((item) => {
    const itemArray = item.split(":");
    const fieldName = itemArray[0].trim();
    const fieldData = itemArray.slice(1).join(":").trim();

    switch (fieldName) {
      case "Username":
        result.username = fieldData;
        break;

      case "Password":
        result.password = fieldData;
        break;

      default:
        if (fieldName === "Notes") {
          result.notes += `${fieldData}\n`;
        } else if (fieldData && fieldName !== "Language") {
          result.notes += `${fieldName}: ${fieldData}\n`;
        }
        break;
    }
  });

  return result;
}

function passportParser(extra: any[]) {
  const result: any = {};
  result.notes = "";

  extra.forEach((item) => {
    const itemArray = item.split(":");
    const fieldName = itemArray[0].trim();
    const fieldData = itemArray.slice(1).join(":").trim();

    switch (fieldName) {
      case "Type":
        result.passport_type = fieldData;
        break;

      case "Number":
        result.passport_number = fieldData;
        break;

      case "Name":
        result.full_name = fieldData;
        break;

      case "Sex":
        result.gender = fieldData;
        break;

      case "Nationality":
        result.nationality = fieldData;
        break;

      case "Date of Birth":
        result.date_of_birth = lastPassDateParser(fieldData);
        break;

      case "Issuing Authority":
        result.place_of_issue = fieldData;
        break;

      case "Issued Date":
        result.date_of_issue = lastPassDateParser(fieldData);
        break;

      case "Expiration Date":
        result.expiration_date = lastPassDateParser(fieldData);
        break;

      default:
        if (fieldName === "Notes") {
          result.notes += `${fieldData}\n`;
        } else if (fieldData && fieldName !== "Language") {
          result.notes += `${fieldName}: ${fieldData}\n`;
        }
        break;
    }
  });

  return result;
}

function socialSecurityParser(extra: any[]) {
  const result: any = {};
  result.notes = "";

  extra.forEach((item) => {
    const itemArray = item.split(":");
    const fieldName = itemArray[0].trim();
    const fieldData = itemArray.slice(1).join(":").trim();

    switch (fieldName) {
      case "Number":
        result.social_security_number = fieldData;
        break;

      case "Name":
        result.full_name = fieldData;
        break;

      default:
        if (fieldName === "Notes") {
          result.notes += `${fieldData}\n`;
        } else if (fieldData && fieldName !== "Language") {
          result.notes += `${fieldName}: ${fieldData}\n`;
        }
        break;
    }
  });

  return result;
}

function driverLicenseParser(extra: any[]) {
  const result: any = {};
  result.notes = "";
  result.address = "";

  extra.forEach((item) => {
    const itemArray = item.split(":");
    const fieldName = itemArray[0].trim();
    const fieldData = itemArray.slice(1).join(":").trim();

    switch (fieldName) {
      case "Number":
        result.drivers_license_number = fieldData;
        break;
      case "Expiration Date":
        result.expiration_date = lastPassDateParser(fieldData);
        break;

      case "License Class":
        result.license_class = fieldData;
        break;

      case "Name":
        result.full_name = fieldData;
        break;

      case "Address":
      case "City / Town":
      case "ZIP / Postal Code":
      case "State":
        if (fieldData) {
          result.address += `${fieldName}: ${fieldData}`;
        }
        break;

      case "Country":
        result.country = fieldData;
        break;

      case "Date of Birth":
        result.date_of_birth = lastPassDateParser(fieldData);
        break;

      case "Sex":
        result.gender = fieldData;
        break;

      default:
        if (fieldName === "Notes") {
          result.notes += `${fieldData}\n`;
        } else if (fieldData && fieldName !== "Language") {
          result.notes += `${fieldName}: ${fieldData}\n`;
        }
        break;
    }
  });

  return result;
}

function addressParser(extra: any[]) {
  const result: any = {};
  result.last_name = "";
  result.notes = "";
  result.address = "";

  extra.forEach((item) => {
    const itemArray: string[] = item.split(":");
    const fieldName: string = itemArray[0].trim();
    let fieldData: string = itemArray.slice(1).join(":").trim();

    switch (fieldName) {
      // case "Title":
      //   result.title = fieldData;
      //   break;

      case "First Name":
        result.first_name = fieldData;
        break;

      case "Middle Name":
      case "Last Name":
        result.last_name += result.last_name ? ` ${fieldData}` : fieldData;
        break;

      case "Gender":
        result.gender = fieldData;
        break;

      case "Birthday":
        result.date_of_birth = lastPassDateParser(fieldData);
        break;

      case "Company":
        result.company = fieldData;
        break;

      case "Address 1":
      case "Address 2":
      case "Address 3":
      case "City / Town":
      case "County":
      case "State":
      case "Zip / Postal Code":
      case "Country":
        if (fieldData) {
          result.address += `${fieldName}: ${fieldData}; `;
        }
        break;

      case "Email Address":
        result.email = fieldData;
        break;

      case "Phone":
        let phoneObj = null;
        try {
          phoneObj = JSON.parse(fieldData);
          fieldData = JSON.parse(fieldData).num;
        } catch (_e) {}
        if (phoneObj) {
          if (phoneObj.num) {
            if (phoneObj.ext) {
              result.phone_number = `${phoneObj.num} ${phoneObj.ext}`;
            } else {
              result.phone_number = phoneObj.num;
            }
          }
        }
        break;

      case "Evening Phone":
      case "Mobile Phone":
      case "Fax":
        try {
          fieldData = JSON.parse(fieldData).num;
        } catch (_e) {}

        result.notes += `${fieldName}: ${fieldData}\n`;
        break;

      default:
        if (fieldName === "Notes") {
          result.notes += `${fieldData}\n`;
        } else if (fieldData && fieldName !== "Language") {
          result.notes += `${fieldName}: ${fieldData}\n`;
        }
        break;
    }
  });

  return result;
}

function creditCardParser(extra: any[]) {
  const result: any = {};
  result.notes = "";

  extra.forEach((item) => {
    const itemArray = item.split(":");
    const fieldName = itemArray[0].trim();
    const fieldData = itemArray.slice(1).join(":").trim();

    switch (fieldName) {
      case "Title":
        result.title = fieldData;
        break;
      case "Name on Card":
        result.cardholder_name = fieldData;
        break;

      case "Type":
        result.type = fieldData;
        break;

      case "Number":
        result.card_number = fieldData;
        break;

      case "Security Code":
        result.security_code = fieldData;
        break;

      case "Expiration Date":
        result.expiration_date = lastPassDateParser(fieldData);
        break;

      case "Pin":
        result.pin = fieldData;
        break;

      default:
        if (fieldName === "Start Date" && fieldData) {
          if (lastPassDateParser(fieldData)) {
            const tmp = DateTime.fromSeconds(lastPassDateParser(fieldData));
            result.notes += `${fieldName}: ${tmp.toFormat("MMMM/yyyy")}\n`;
          }
        } else if (fieldName === "Notes") {
          result.notes += `${fieldData}\n`;
        } else if (fieldData && fieldName !== "Language") {
          result.notes += `${fieldName}: ${fieldData}\n`;
        }
        break;
    }
  });

  return result;
}

function bankAccountParser(extra: any[]) {
  const result: any = {};
  result.notes = "";

  extra.forEach((item) => {
    const itemArray = item.split(":");
    const fieldName = itemArray[0].trim();
    const fieldData = itemArray.slice(1).join(":").trim();

    switch (fieldName) {
      case "Title":
        result.title = fieldData;
        break;

      case "Bank Name":
        result.bank_name = fieldData;
        break;

      case "Account Type":
        result.type = fieldData;
        break;

      case "Routing Number":
        result.routing_number = fieldData;
        break;

      case "Account Number":
        result.account_number = fieldData;
        break;

      case "SWIFT Code":
        result.swift = fieldData;
        break;

      case "IBAN Number":
        result.iban = fieldData;
        break;

      case "Pin":
        result.pin = fieldData;
        break;

      default:
        if (fieldName === "Notes") {
          result.notes += `${fieldData}\n`;
        } else if (fieldData && fieldName !== "Language") {
          result.notes += `${fieldName}: ${fieldData}\n`;
        }
        break;
    }
  });

  return result;
}

function defaultParser(extra: any[]) {
  const result: any = {};
  result.notes = "";

  extra.forEach((item) => {
    const itemArray = item.split(":");
    const fieldName = itemArray[0].trim();
    const fieldData = itemArray.slice(1).join(":").trim();

    if (fieldName === "Notes") {
      result.notes += `${fieldData}\n`;
    } else if (fieldData && fieldName !== "Language") {
      result.notes += `${fieldName}: ${fieldData}\n`;
    }
  });

  return result;
}

const importFromLastPass = (contents: any) => {
  return csvparse(contents, { columns: true }).map((item: any) => {
    let record_type: number = item.grouping === "Email" ? 7 : 12;
    let category: number = item.grouping === "Email" ? 2 : 3;
    let components: any = {};

    if (item.name) {
      components.title = item.name;
    }
    if (item.url && item.url !== "http://sn") {
      components.url = item.url;
    }
    if (item.username) {
      components.username = item.username;
    }
    if (item.password) {
      components.password = item.password;
    }
    if (item.url !== "http://sn") {
      record_type = 7;
      category = 2;
    }
    if (item.extra) {
      const arrayExtra = item.extra.split("\n");
      const noteTypeLine = arrayExtra[0];

      if (noteTypeLine.includes("NoteType:")) {
        const type = noteTypeLine.split(":")[1].trim();
        const arrayDataExtra = arrayExtra.slice(1);

        switch (type) {
          case "Passport":
            record_type = 1;
            category = 0;
            components = { ...components, ...passportParser(arrayDataExtra) };
            break;
          case "Driver's License":
            record_type = 2;
            category = 0;
            components = {
              ...components,
              ...driverLicenseParser(arrayDataExtra),
            };
            break;
          case "Address":
            record_type = 3;
            category = 0;
            components = { ...components, ...addressParser(arrayDataExtra) };
            break;
          case "Social Security Number":
          case "Social Security":
            record_type = 4;
            category = 0;
            components = {
              ...components,
              ...socialSecurityParser(arrayDataExtra),
            };
            break;
          case "Credit Card":
            record_type = 5;
            category = 1;
            components = { ...components, ...creditCardParser(arrayDataExtra) };
            break;
          case "Bank Account":
            record_type = 6;
            category = 1;
            components = {
              ...components,
              ...bankAccountParser(arrayDataExtra),
            };
            break;
          case "Password":
            record_type = 7;
            category = 2;
            components = { ...components, ...passwordParser(arrayDataExtra) };
            break;
          case "Software License":
            record_type = 8;
            category = 2;
            components = {
              ...components,
              ...softwareLicenseParser(arrayDataExtra),
            };
            break;
          case "Email Account":
            record_type = 9;
            category = 2;
            components = {
              ...components,
              ...emailAccountParser(arrayDataExtra),
            };
            break;
          case "Wi-Fi Password":
            record_type = 11;
            category = 2;
            components = {
              ...components,
              ...wifiPasswordParser(arrayDataExtra),
            };
            break;
          default:
            record_type = 12;
            category = 3;
            components = { ...components, ...defaultParser(arrayDataExtra) };
        }
      } else {
        components.notes = item.extra;
      }
    }
    return { record_type, category, components };
  });
};

export = (module.exports = importFromLastPass);
