import { Portal, User, Category, Tag } from "./models";
import { connectToDB } from "./utils";
export const cards = [
    {
      id: 1,
      title: "Total Users",
      number: 10.928,
      change: 12,
    },
    {
      id: 2,
      title: "Stock",
      number: 8.236,
      change: -2,
    },
    {
      id: 3,
      title: "Revenue",
      number: 6.642,
      change: 18,
    },
  ];


  export const fetchUsers = async (q) => {
    try {
      connectToDB();
      const users = await User.find();
      return users;
    }
    catch (error) {
        console.log(error);
    }
  }

  export const fetchPortals = async () => {
    try {
      connectToDB();
      const portals = await Portal.find();
      console.log(portals);
      return portals;
    }
    catch (error) {
        console.log(error);
    }
  }

  // fetch portal by id
  export const fetchPortal = async (id) => {
    try {
      connectToDB();
      const portal = await Portal.findById(id);
      return portal;
    }
    catch (error) {
        console.log(error);
    }
  }

  // fetch all category
  export const fetchCategories = async () => {
    try {
      connectToDB();
      const categories = await Category.find();
      return categories;
    }
    catch (error) {
        console.log(error);
    }
  }

  // fetch all tags

  export const fetchTags = async () => {
    try {
      connectToDB();
      const tags = await Tag.find();
      return tags;
    }
    catch (error) {
        console.log(error);
    }
  }
  // get category by id
  export const fetchCategory = async (id) => {
    try {
      connectToDB();
      const category = await Category.findById(id);
      return category;
    }
    catch (error) {
        console.log(error);
    }
  }

  // get tag by id
  export const fetchTag = async (id) => {
    try {
      connectToDB();
      const tag = await Tag.findById(id);
      return tag;
    }
    catch (error) {
        console.log(error);
    }
  }

  // get the name of category by id
  export const fetchCategoryName = async (id) => {
    try {
      connectToDB();
      const category = await Category.findById(id);
      return category.name;
    }
    catch (error) {
        console.log(error);
    }
  } 