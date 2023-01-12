/* eslint-disable import/no-anonymous-default-export */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("athlete");
    const { id } = req.query;

    const post = await db.collection("profile").findOne({});
    console.log(post)
    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
