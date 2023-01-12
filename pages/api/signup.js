/* eslint-disable import/no-anonymous-default-export */
import clientPromise from "../../lib/mongodb";


export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("athlete");
        const { name, gender, dob, location, team, description, interest, image, sports } = req.body;

        const userSignup = await db.collection("user").insertOne({
            name, gender, dob, location, team, description, interest, image, sports
        });
        if (userSignup) res.status(200).json({ message: 'Signup successful!' });

    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}