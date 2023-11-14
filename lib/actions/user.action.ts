import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface UpdateUserParams {
  clerkId: string;
  userData: Partial<IUser>;
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser({ clerkId, userData }: UpdateUserParams) {
  try {
    connectToDatabase();

    await User.findOneAndUpdate({ clerkId }, userData, { new: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser({ clerkId }: { clerkId: string }) {
  try {
    connectToDatabase();

    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
