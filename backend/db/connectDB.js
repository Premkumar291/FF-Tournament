import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongo db connected successfully");
    } catch (error) {
        console.log(`Error in mongo db connection : ${error}`);
        process.exit(1);
    }
}

export default connectDB;