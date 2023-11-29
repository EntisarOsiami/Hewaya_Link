"use server";

import { revalidatePath } from "next/cache";
import { Portal, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";

export const addUser = async (formData) => {
  const { username, email, password, disabled, role } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email: {
        address : email,
      },
      password: {
        value: hashedPassword
      },
      disabled: disabled,
      role: role,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, disabled, role } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updateFields = {
      username,
      email: {
        address : email,
      },
      password: {
        value: hashedPassword
      },
      disabled: disabled,
      role: role,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};


export const addPortal = async (formData) => {
  const { name, description} =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const newPortal = new Portal({
      name: name,
      description: description,
      
    });

    await newPortal.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create Portal !");
  }

  revalidatePath("/dashboard/portals");
  redirect("/dashboard/portals");
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    return "Wrong Credentials!";
  }
};
