import { ISecureNotes, securenotes } from "./securenotes";
import { ids, IIds } from "./ids";
import { credentials, ICredentials } from "./credentials";
import { IPersonalInfo, personalinfo } from "./personalinfo";
import { IPayments, payments } from "./payments";

export interface IAllData {
  securenotes: ISecureNotes[];
  ids: IIds[];
  credentials: ICredentials[];
  personalinfo: IPersonalInfo[];
  payments: IPayments[];
}

export type IFileName =
  | "securenotes"
  | "ids"
  | "credentials"
  | "personalinfo"
  | "payments";

export const formatters = {
  securenotes,
  ids,
  credentials,
  personalinfo,
  payments,
};
