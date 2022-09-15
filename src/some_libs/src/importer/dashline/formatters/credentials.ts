import { formatNotes } from "./helpers";

export interface ICredentials {
  username: string;
  username2: string;
  username3: string;
  title: string;
  password: string;
  note: string;
  url: string;
  category: string;
  otpSecret: string;
}

const getEmail = (
  username: string,
  username2: string,
  username3: string,
  isNote = false,
) => {
  if (!isNote) {
    return username || username2 || username3;
  } else {
    const obj: Record<string, string> = {
      username,
      username2,
      username3,
    };

    const emailKey = Object.keys(obj).find((key) => obj[key]);
    return Object.keys(obj)
      .filter((key) => key !== emailKey)
      .reduce(
        (acc, key) => ({
          ...acc,
          [key]: obj[key],
        }),
        {},
      );
  }
};

export const credentials = (credentials: ICredentials[]) =>
  credentials.map(
    ({
      title,
      username,
      password,
      url,
      username2,
      username3,
      note,
      category,
      otpSecret,
    }) => ({
      record_type: 7,
      category: 2,
      components: {
        title,
        email: getEmail(username, username2, username3),
        password,
        url,
        notes: formatNotes(
          {
            note,
            ...getEmail(username, username2, username3, true),
            category,
            otpSecret,
          },
          "note",
        ),
      },
    }),
  );
