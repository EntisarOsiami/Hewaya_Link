import {Tag, User, Portal,Category } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  console.log(id);
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const getCounts = async () => {
  try {
    connectToDB();
    const usersCount = await User.find().count();
    const portalsCount = await Portal.find().count();
    const categoriesCount = await Category.find().count();
    const tagsCount = await Tag.find().count();
    return { usersCount, portalsCount, categoriesCount, tagsCount };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch counts!");
  }
}

export const fetchPortals = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    const count = await Portal.find({ name: { $regex: regex } }).count();
    const portals = await Portal.find({ name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, portals };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch portals!");
  }
};

// fetch portals based on latest date
export const fetchLatestPortals = async () => {
  try {
    connectToDB();
    const portals = await Portal.find().sort({ createdAt: -1 }).limit(5);
    return portals;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch latest portals!");
  }
};

export const fetchPortal = async (id) => {
  try {
    connectToDB();
    const portal = await Portal.findById(id);
    return portal;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch portal!");
  }
};


// fetchTags
export const fetchTags = async (q, page) => {
  console.log(q);
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    const count = await Tag.find({ name: { $regex: regex } }).count();
    const tags = await Tag.find({ name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, tags };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch tags!");
  }
};


export const fetchTag = async (id) => {
  try {
    connectToDB();
    const tag = await Tag.findById(id);
    return tag;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Tag!");
  }
};

// fetchCategories
export const fetchCategories = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    const count = await Category.find({ name: { $regex: regex } }).count();
    const categories = await Category.find({ name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, categories };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch categories!");
  }
};

// fetchCategory
export const fetchCategory = async (id) => {
  try {
    connectToDB();
    const category = await Category.findById(id);
    return category;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Category!");
  }
};
const {usersCount, portalsCount, categoriesCount, tagsCount }  = await getCounts();
export const cards = [
  {
    id: 1,
    title: "Total Users",
    number: usersCount,
  },
  {
    id: 2,
    title: "Portals",
    number: portalsCount,
  },
  {
    id: 3,
    title: "Categories",
    number: categoriesCount,
  },
  {
    id: 4,
    title: "Tags",
    number: tagsCount,
  },
];

