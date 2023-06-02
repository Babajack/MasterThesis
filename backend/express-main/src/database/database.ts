import mongoose from "mongoose";

// Connection URI
const mongodb_username = process.env.MONGODB_USERNAME;
const mongodb_passwort = process.env.MONGODB_PASSWORT;
const uri = `mongodb://${mongodb_username}:${mongodb_passwort}@mongodb:27017`;

// connect to mongoose
export const getConnection = () => mongoose.connect(uri);
