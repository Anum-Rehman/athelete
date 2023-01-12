import clientPromise from "../../lib/mongodb";
const ObjectId = require('mongodb').ObjectId;


/* eslint-disable import/no-anonymous-default-export */
export default async (req, res) => {
    const { id } = req.query;

    try {
        const client = await clientPromise;
        const db = client.db("athlete");
        const stringId = id;
        const objectId = new ObjectId(stringId);
        const user = await db.collection("user").findOne({ _id: objectId });
        res.status(200).json({ status:true, data: user });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}