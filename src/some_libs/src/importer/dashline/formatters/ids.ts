const parseDashlineDate = require("../parseData");

export interface IIds {
  type: string;
  number?: string;
  name?: string;
  issue_date?: string;
  expiration_date?: string;
  place_of_issue?: string;
  state?: string;
}

export const ids = (ids: IIds[]) =>
  ids.map(({ type, number, name, issue_date, expiration_date }) => {
    switch (type) {
      case "card": {
        return {
          record_type: 0,
          category: 0,
          components: {
            title: type,
            id_card_number: number,
            full_name: name,
            date_of_issue: parseDashlineDate(issue_date),
            expiration_date: parseDashlineDate(expiration_date),
          },
        };
      }
      case "passport": {
        return {
          record_type: 1,
          category: 0,
          components: {
            title: type,
            passport_number: number,
            date_of_issue: issue_date,
            full_name: name,
            expiration_date: parseDashlineDate(expiration_date),
          },
        };
      }
      case "license": {
        return {
          record_type: 2,
          category: 0,
          components: {
            title: type,
            drivers_license_number: number,
            full_name: name,
            date_of_issue: parseDashlineDate(issue_date),
            expiration_date: parseDashlineDate(expiration_date),
          },
        };
      }
      case "social_security": {
        return {
          record_type: 4,
          category: 0,
          components: {
            title: type,
            social_security_number: number,
            full_name: name,
          },
        };
      }
      case "tax_number": {
        return {
          record_type: 12,
          category: 3,
          components: {
            title: type,
            notes: number,
          },
        };
      }
    }
  });
