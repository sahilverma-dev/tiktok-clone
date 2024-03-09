import { account } from "../client";

export const loginUser = async (email: string, password: string) =>
  await account.createEmailPasswordSession(email, password);
