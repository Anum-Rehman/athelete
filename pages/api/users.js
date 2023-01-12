/* eslint-disable import/no-anonymous-default-export */
import clientPromise from "../../lib/mongodb";


export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("athlete");
        const profile = await db.collection("user").find({}).toArray()
        res.status(200).json({ status: true, data: profile });

    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}