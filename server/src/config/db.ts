import mongoose from "mongoose";

async function connectDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://phritik06:zfXJ65SNiZoXhayt@eccom.zqrt7ny.mongodb.net/Erino?retryWrites=true&w=majority"
    );
    console.log(
      `Database connected successfully at ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log("Something went wrong while connecting database");
  }
}

export default connectDatabase;
