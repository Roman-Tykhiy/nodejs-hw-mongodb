import mongoose from "mongoose";
import { getEnVar } from "../utils/getEnVar.js";

export const ininMongoConnection = async () => {
    try {
        const password = getEnVar("MONGODB_PASSWORD");
        await mongoose.connect(`mongodb+srv://Roman:${password}@cluster0.tqafiqm.mongodb.net/my_contacts?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Successfully connection database");
        
    }
    catch (error) {
        console.log(error.message);
        throw error
        
    }
}