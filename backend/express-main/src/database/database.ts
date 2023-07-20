import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import { getTaskDefinitions } from "./taskDefinitions";
import { populateDatabase } from "./task";

// Connection URI
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const DB_NAME = process.env.MONGODB_DB_NAME;
const MONGODB_HOST = process.env.MONGODB_SERVER;
const uri = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/`;

// connect to mongoose
const client = mongoose.connect(uri, { dbName: DB_NAME }).then((c) => c.connection.getClient());

// init database, set tasks
populateDatabase(getTaskDefinitions());

// session store
export const getSessionStore = () => {
	return MongoStore.create({
		clientPromise: client,
		dbName: DB_NAME,
		ttl: 14 * 24 * 60 * 60,
		autoRemove: "native",
	});
};
