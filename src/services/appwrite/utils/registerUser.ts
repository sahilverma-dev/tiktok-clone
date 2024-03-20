import { User } from "@/interfaces";
import { ID, account, databases } from "../client";
import { DATABASE_ID, USER_COLLECTION_ID } from "@/constants/appwrite";

type Type = (data: {
  email: string;
  password: string;
  fullName: string;
}) => Promise<User>;

export const registerUser: Type = async ({ email, password, fullName }) => {
  const userId = ID.unique();

  const user = await account.create(userId, email, password);

  if (!user) {
    throw new Error("Failed to create user");
  }
  const userDoc = await databases.createDocument(
    DATABASE_ID,
    USER_COLLECTION_ID,
    user.$id,
    {
      auth_id: user.$id,
      email: email.trim(),
      full_name: fullName.trim(),
    }
  );

  return userDoc as User;
};
