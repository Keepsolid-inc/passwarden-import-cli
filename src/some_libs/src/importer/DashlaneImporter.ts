const parseDashlineDate = require("./dashline/parseData");

const importFromDashlaneJson = (contents: any) => {
  try {
    const data = JSON.parse(contents);
    let result: any[] = [];

    if (data.ADDRESS?.length) {
      const records = parseDataFromJson(3, 0, data.ADDRESS, (record: any) => {
        const {
          addressName: title,
          country,
          city,
          state,
          zipcode,
          addressFull,
          ...notes
        } = record;
        const items = {
          title,
          address: `${country ?? ""} ${city ?? ""} ${state ?? ""} ${
            zipcode ?? ""
          } ${addressFull ?? ""}`,
        };
        return { items, notes };
      });

      result = [...result, ...records];
    }

    if (data.BANKSTATEMENT?.length) {
      const records = parseDataFromJson(
        6,
        1,
        data.BANKSTATEMENT,
        (record: any) => {
          const items = {
            title: record.BankAccountName,
            iban: record.BankAccountIBAN,
            bank_name: record.BankAccountBank,
            account_number: record.BankAccountBIC,
            name_on_account: record.BankAccountOwner,
          };

          return { items, notes: record.PersonalNote };
        },
      );

      result = [...result, ...records];
    }

    if (data.AUTHENTIFIANT?.length) {
      const records = parseDataFromJson(
        7,
        2,
        data.AUTHENTIFIANT,
        (record: any) => {
          const items = {
            url: record.domain,
            username: record.email
              ? record.email
              : record.login
              ? record.login
              : null,
            password: record.password,
            title: record.title,
          };

          return { items, notes: record.PersonalNote };
        },
      );

      result = [...result, ...records];
    }

    if (data.COMPANY?.length) {
      const records = parseDataFromJson(12, 3, data.COMPANY, (record: any) => {
        const { jobTitle: title, ...notes } = record;
        const items = {
          title,
        };
        let filteredNotes: any = {};
        Object.keys(notes).forEach((key: any) => {
          if (notes[key]) {
            filteredNotes[key] = notes[key];
          }
        });
        return { items, notes: filteredNotes };
      });

      result = [...result, ...records];
    }

    if (data.DRIVERLICENCE?.length) {
      const records = parseDataFromJson(
        2,
        0,
        data.DRIVERLICENCE,
        (record: any) => {
          const items = {
            title: "Driver Licence",
            full_name: record.Fullname,
            drivers_license_number: record.Number,
            address: record.State,
            gender: record.Sex,
            date_of_birth: parseDashlineDate(record.DateOfBirth),
            date_of_issue: parseDashlineDate(record.DeliveryDate),
            expiration_date: parseDashlineDate(record.ExpireDate),
          };

          record.PersonalNote = `Linked Identity: ${record.LinkedIdentity}${
            record.PersonalNote ? "\n" + record.PersonalNote : ""
          }`;

          return { items, notes: record.PersonalNote };
        },
      );

      result = [...result, ...records];
    }

    if (data.EMAIL?.length) {
      const records = parseDataFromJson(7, 2, data.EMAIL, (record: any) => {
        const items = {
          username: record.email,
        };

        return { items, notes: "" };
      });

      result = [...result, ...records];
    }

    if (data.FISCALSTATEMENT?.length) {
      const records = parseDataFromJson(
        4,
        0,
        data.FISCALSTATEMENT,
        (record: any) => {
          const items = {
            social_security_number: record.FiscalNumber,
          };

          let tmpNote = "";
          if (record.TeledeclarantNumber) {
            tmpNote += `Teledeclarant Number: ${record.TeledeclarantNumber}\n`;
          }
          if (record.PersonalNote) {
            tmpNote += `Personal note: ${record.PersonalNote}`;
          }

          return { items, notes: tmpNote };
        },
      );

      result = [...result, ...records];
    }

    if (data.IDCARD?.length) {
      const records = parseDataFromJson(0, 0, data.IDCARD, (record: any) => {
        const items = {
          date_of_birth: parseDashlineDate(record.DateOfBirth),
          date_of_issue: parseDashlineDate(record.DeliveryDate),
          expiration_date: parseDashlineDate(record.ExpireDate),
          full_name: record.Fullname,
          id_card_number: record.Number,
          gender: record.Sex,
        };

        record.PersonalNote = `Linked Identity: ${record.LinkedIdentity}${
          record.PersonalNote ? "\n" + record.PersonalNote : ""
        }`;

        return { items, notes: record.PersonalNote };
      });

      result = [...result, ...records];
    }

    if (data.IDENTITY?.length) {
      const records = parseDataFromJson(0, 0, data.IDENTITY, (record: any) => {
        const items = {
          date_of_birth: parseDashlineDate(record.dateOfBirth),
          full_name: record.fullName,
        };

        let tmpNote = "";

        if (record.placeOfBirth) {
          tmpNote += `Place of birth: ${record.placeOfBirth}\n`;
        }
        if (record.dateOfBirthArea) {
          tmpNote += `Date of birth Area: ${record.dateOfBirthArea}\n`;
        }
        if (record.pseudo) {
          tmpNote += `Pseudo: ${record.pseudo}`;
        }

        return { items, notes: record.tmpNote };
      });

      result = [...result, ...records];
    }

    if (data.PASSPORT?.length) {
      const records = parseDataFromJson(1, 0, data.PASSPORT, (record: any) => {
        const items = {
          date_of_birth: parseDashlineDate(record.DateOfBirth),
          date_of_issue: parseDashlineDate(record.DeliveryDate),
          place_of_issue: record.DeliveryPlace,
          expiration_date: parseDashlineDate(record.ExpireDate),
          full_name: record.Fullname,
          passport_number: record.Number,
          gender: record.Sex,
        };

        record.PersonalNote = `Linked Identity: ${record.LinkedIdentity}${
          record.PersonalNote ? "\n" + record.PersonalNote : ""
        }`;

        return { items, notes: record.PersonalNote };
      });

      result = [...result, ...records];
    }

    if (data.PAYMENTMEANS_CREDITCARD?.length) {
      const records = parseDataFromJson(
        5,
        1,
        data.PAYMENTMEANS_CREDITCARD,
        (record: any) => {
          const items = {
            card_number: record.cardNumber,
            bank_name: record.bank,
            cardholder_name: record.owner,
            title: record.bank,
          };
          return { items, notes: "" };
        },
      );
      result = [...result, ...records];
    }

    if (data.PAYMENTMEAN_PAYPAL?.length) {
      const records = parseDataFromJson(
        7,
        2,
        data.PAYMENTMEAN_PAYPAL,
        (record: any) => {
          const items = {
            title: record.Name,
            username: record.Login,
            password: record.Password,
            website: "https://www.paypal.com/",
          };
          return { items, notes: "" };
        },
      );
      result = [...result, ...records];
    }

    if (data.PERSONALWEBSITE?.length) {
      const records = parseDataFromJson(
        7,
        2,
        data.PERSONALWEBSITE,
        (record: any) => {
          const items = {
            title: record.Name,
            url: record.Website,
          };
          return { items, notes: record.PersonalNote };
        },
      );
      result = [...result, ...records];
    }

    if (data.PHONE?.length) {
      const records = parseDataFromJson(3, 0, data.PHONE, (record: any) => {
        const items = {
          first_name: record["name 1"],
          last_name: record["name 2"],
          phone_number: record.number,
        };
        return { items, notes: `type: ${record.type}` };
      });
      result = [...result, ...records];
    }

    if (data.SOCIALSECURITYSTATEMENT?.length) {
      const records = parseDataFromJson(
        4,
        0,
        data.SOCIALSECURITYSTATEMENT,
        (record: any) => {
          const items = {
            date_of_birth: parseDashlineDate(record.DateOfBirth),
            gender: record.Sex,
            full_name: record.SocialSecurityFullname,
            social_security_number: record.SocialSecurityNumber,
          };
          record.PersonalNote = `Linked Identity: ${record.LinkedIdentity}${
            record.PersonalNote ? "\n" + record.PersonalNote : ""
          }`;
          return { items, notes: record.PersonalNote };
        },
      );
      result = [...result, ...records];
    }

    return result;
  } catch (_e) {}
};

function parseDataFromJson(
  record_type: number,
  category: number,
  data: any[],
  callback: any,
) {
  return data.map((record: any) => {
    const { items, notes } = callback(record);
    const _notes = typeof notes === "string" ? notes : JSON.stringify(notes);

    return { record_type, category, components: { ...items, notes: _notes } };
  });
}

export = (module.exports = importFromDashlaneJson);

const o = [
  {
    category: 2,
    record_type: 7,
    components: {
      title: "Credentials.title",
      username: "Credentials.username",
      password: "Credentials.password",
      url: "Credentials.url",
      notes: " * все остальные поля с переносом * ",
    },
  },
  {
    category: 0,
    record_type: 0,
    components: {
      full_name: "Ids.name",
      id_card_number: "Ids.number",
      date_of_issue: "Ids.issue_date",
      expiration_date: "Ids.expiration_date",
      date_of_birth: 0,
      gender: "NO_TYPE",
      notes: " * все остальные поля с переносом * ",
    },
  },
  {
    category: 1,
    record_type: 5,
    components: {
      type: "Payments.type",
      cardholder_name: "Payments.account_name",
      bank_name: "",
      card_number: "",
      security_code: "",
      pin: "",
      expiration_date: "",
      billing_address: "",
      phone_number: "",
      notes: " * все остальные поля с переносом * ",
    },
  },
];
