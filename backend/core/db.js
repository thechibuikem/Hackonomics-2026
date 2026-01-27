import mongoose from "mongoose"; // import mongoose ODM

// async function to connect to mongodb
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB ✅`); // tell me that I've connected successfully if I have
  } catch (err) {
    console.log("error connecting to mongo db", err);
  }
};

export default connectDB;
