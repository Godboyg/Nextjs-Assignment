import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if(!MONGODB_URI){
    throw new Error("Please define MONGODB_URI inside .env.local");
}

declare global {
  var mongooseCache: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectDB(): Promise<Mongoose> {
    if(cached.conn) return cached.conn;

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
    }

    cached.conn =  await cached.promise;
    return cached.conn
}