"use server";

import { revalidatePath } from "next/cache";
import { User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/dist/server/api-utils";
export const deleteUser = async (formData) => {
    console.log("test");
  };
  


  export const addUser = async (formData) => {
    const { username, email, password, role, disabled } =
      Object.fromEntries(formData);
  
    try {
      console.log("====================================");
      console.log(formData);
      connectToDB();
        const newUser = new User({
        username,
        email,
        password,
        role,
        disabled
    });
  
      await newUser.save();
    } catch (err) {
      console.log(err);
      throw new Error("Failed to create user!");
    }
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
  }