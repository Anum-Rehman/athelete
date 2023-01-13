
// import {MongoClient} from 'mongodb'

const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGODB_URI
const options = {
    useUnifiedTopology: true ,
    useNewUrlParser: true,
}

// const clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local')
}

// if (process.env.NODE_ENV === 'development') {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = await client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
const clientPromise = async () => {
  try {
    let client = new MongoClient(uri, options)
    var connect = await client.connect();
    console.log("Database Connected Successfully!")
    return connect;
  }
  catch (err) {
    console.log(err, "<===Error");
    return;
  }
   

}

// }

export default clientPromise