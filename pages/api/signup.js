/* eslint-disable import/no-anonymous-default-export */
import clientPromise from "../../lib/mongodb";


export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("athlete");
        const userSignup = await db.collection("user").insertOne(req.body);
        if (userSignup) res.status(200).json({ message: 'Signup successful!' });

    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}