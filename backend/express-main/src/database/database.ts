import MongoStore from "connect-mongo";
import mongoose from "mongoose";

// Connection URI
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORT = process.env.MONGODB_PASSWORT;
const DB_NAME = process.env.MONGODB_DB_NAME;
const MONGODB_HOST = process.env.DEBUG ? "localhost:27017" : "mongodb";
const uri = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORT}@${MONGODB_HOST}/`;

// connect to mongoose
const client = mongoose.connect(uri, { dbName: DB_NAME }).then((c) => c.connection.getClient());

export const getSessionStore = () => {
	return MongoStore.create({
		clientPromise: client,
		dbName: process.env.MONGODB_DB_NAME,
		ttl: 14 * 24 * 60 * 60,
		autoRemove: "native",
	});
};
