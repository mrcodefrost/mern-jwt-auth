import mongoose from "mongoose"
import { MONGO_URI } from "../constants/env";

const connectToDatabse = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Successfully connected to the database");
    } catch (error) {
        console.log('Could not connect to the database', error);
        process.exit(1); // shut down server if can't connect to the database
    }
}

export default connectToDatabse;