import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected:", mongoose.connection.host);
    });

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB Connection Error:", error.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB Disconnected");
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
