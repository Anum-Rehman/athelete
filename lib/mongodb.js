
import {MongoClient} from 'mongodb'

const MONGODB_URI = 'mongodb+srv://anum:anum1234@cluster0.firxt.mongodb.net/athlete?retryWrites=true&w=majority'
const uri = MONGODB_URI
const options = {
    useUnifiedTopology: true ,
    useNewUrlParser: true,
}

let client
let clientPromise

if (!MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
                    .then(res => console.log("Connected Successfully!"))
                    .catch(err => console.log(err, "<===Error"))
}

export default clientPromise