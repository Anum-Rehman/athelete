const cloudinary = require('cloudinary').v2;
const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export default async (req, res) => {
    try {
        // const file = fs.readFileSync(req.body)
        console.log(req.body, "req")
        // const buffer = fs.readFileSync(req.body);
        // console.log({buffer})
        // const result = await cloudinary.uploader.upload(req.body);
        // console.log(result);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}