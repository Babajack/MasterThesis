import mongoose from "mongoose";

// Connection URI
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORT = process.env.MONGODB_PASSWORT;
const DB_NAME = process.env.MONGODB_DB_NAME;
const uri = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORT}@mongodb/`;

// connect to mongoose
export const getConnection = () => mongoose.connect(uri, { dbName: DB_NAME });
