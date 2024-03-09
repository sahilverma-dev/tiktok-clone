import { ID, account } from "../client";

export const registerUser = async (email: string, password: string) =>
  await account.create(ID.unique(), email, password);
