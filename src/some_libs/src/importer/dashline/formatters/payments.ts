import { formatNotes } from "./helpers";

const parseDashlineDate = require("../parseData");

export interface IPayments {
  type: "bank" | "credit_card";
  account_name: string;
  account_holder: string;
  cc_number: string;
  code: string;
  expiration_month: string;
  expiration_year: string;
  routing_number: string;
  account_number: string;
  country: string;
  issuing_bank: string;
}

export const payments = (payments: IPayments[]) =>
  payments.map(
    ({
      type,
      account_name,
      account_holder,
      cc_number,
      code,
      expiration_month,
      expiration_year,
      routing_number,
      account_number,
      country,
      issuing_bank,
    }) => {
      switch (type) {
        case "credit_card":
          return {
            record_type: 5,
            category: 1,
            components: {
              title: account_name,
              cardholder_name: account_name,
              card_number: cc_number,
              security_code: code,
              expiration_date: parseDashlineDate(
                `${expiration_year}-${expiration_month}-1`,
              ),
              notes: formatNotes({ country }),
            },
          };
        case "bank":
          return {
            record_type: 6,
            category: 1,
            components: {
              title: account_name,
              bank_name: account_name,
              name_on_account: account_holder,
              routing_number,
              account_number,
              notes: formatNotes({ country }),
            },
          };
      }
    },
  );
