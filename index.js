import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb'
dotenv.config();
const app = express();
app.use(express.json());
const port = 5000;


const MONGO_DB1 = process.env.MONGO_DB;
async function createDBConnection(){
    const client = new MongoClient(MONGO_DB1);
    await client.connect();
    console.log("Connected to Atlas DB");
    return client;
}

app.get("/", (request, response) => {
    response.send("Welcome to Room Booking API")
})

app.post("/create-room", async (request, response) => {
    const roomData = request.body;
    console.log(roomData);
    const client = await createDBConnection();
    const result = await client 
    .db("hall-booking")
    .collection("room")
    .insertMany(request.body);

    response.send(result)
});
app.post("/book-room", async(request, response) => {
    const  userData = request.body;
    console.log(userData);
    const client = await createDBConnection();
    const result = await client.db("hall-booking")
    .collection("room")
    .insertOne(request.body);
    response.send(result);
});

app.get("/list-all-booked-room", async(request, response) => {
    const bookedRoom = request.query.body;
    const client = await  createDBConnection();
    const result = await client.db("hall-booking")
    .collection("room")
    .find({bookingstatus : bookedRoom});
    // .find({"booking-status": {$ne: false}});
    response.send(result);


})

app.get("/list-all-customers-data", async(request, response) => {
    const client = await createDBConnection();
    const result = await client.db("hall-booking")
    .collection("room")
    .find({});
    response.send(result); 

});










app.listen(port, () => console.log("The server is started at: ", port))