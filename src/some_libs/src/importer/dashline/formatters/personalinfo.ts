import { formatNotes } from "./helpers";

const parseDashlineDate = require("../parseData");

export interface IPersonalInfo {
  type: "name" | "email" | "number" | "address" | "company" | "website";
  title: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  login: string;
  date_of_birth: string;
  place_of_birth: string;
  email: string;
  email_type: string;
  item_name: string;
  phone_number: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  address_recipient: string;
  address_building: string;
  address_apartment: string;
  address_floor: string;
  address_door_code: string;
  job_title: string;
  url: string;
}

export const personalinfo = (info: IPersonalInfo[]) =>
  info.map(
    ({
      type,
      title,
      first_name,
      middle_name,
      last_name,
      login,
      date_of_birth,
      place_of_birth,
      email,
      email_type,
      item_name,
      phone_number,
      address,
      country,
      state,
      city,
      zip,
      address_recipient,
      address_building,
      address_apartment,
      address_floor,
      address_door_code,
      job_title,
      url,
    }) => {
      const getComponentsByType = (type: string) => {
        switch (type) {
          case "name":
            return {
              title: `${first_name} ${middle_name} ${last_name} `,
              first_name,
              last_name,
              date_of_birth: parseDashlineDate(date_of_birth),
              notes: formatNotes({
                title,
                middle_name,
                login,
                place_of_birth,
              }),
            };
          case "email":
            return {
              title: item_name,
              email,
              notes: formatNotes({
                email_type,
              }),
            };
          case "number":
            return {
              title: item_name,
              phone_number,
            };
          case "address":
            return {
              title: item_name,
              address,
              notes: formatNotes({
                country,
                state,
                city,
                zip,
                address_recipient,
                address_building,
                address_apartment,
                address_floor,
                address_door_code,
              }),
            };
          case "company":
            return {
              title: item_name,
              notes: formatNotes({
                job_title,
              }),
            };
          case "website":
            return {
              title: item_name,
              notes: formatNotes({
                url,
              }),
            };
        }
      };

      return {
        record_type: 3,
        category: 0,
        components: getComponentsByType(type),
      };
    },
  );
