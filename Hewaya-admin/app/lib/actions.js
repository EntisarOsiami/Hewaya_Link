"use server";

import { revalidatePath } from "next/cache";
import { Category, Portal, User } from "./models";
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


export const updatePortal = async (formData) => {
  const { id, name, description } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      name: name,
      description: description,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Portal.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/portals");
  redirect("/dashboard/portals");
};

export const deletePortal = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Portal.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete portal!");
  }

  revalidatePath("/dashboard/portals");
};


export const addCategory = async (formData) => {
  const { name} =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const newCategory = new Category({
      name: name,      
    });

    await newCategory.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create Portal !");
  }

  revalidatePath("/dashboard/category");
  redirect("/dashboard/category");
};

export const updateCategory = async (formData) => {
  const { id, name } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      name: name,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Category.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/category");
  redirect("/dashboard/category");
};

// delete category
export const deleteCategory = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Category.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete category!");
  }

  revalidatePath("/dashboard/category");
};

// add tag
export const addTag = async (formData) => {
  const { name} =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const newTag = new Tag({
      name: name,      
    });

    await newTag.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create Tag !");
  }

  revalidatePath("/dashboard/tags");
  redirect("/dashboard/tags");
};

// update tag
export const updateTag = async (formData) => {
  const { id, name } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      name: name,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Tag.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update Tag!");
  }

  revalidatePath("/dashboard/tags");
  redirect("/dashboard/tags");
};

// delete tag
export const deleteTag = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Tag.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete Tag!");
  }

  revalidatePath("/dashboard/tags");
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    return "Wrong Credentials!";
  }
};
