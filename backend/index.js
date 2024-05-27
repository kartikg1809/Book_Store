import express from "express";
import {port,mongodburl} from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from "cors";
const app=express();

app.use(cors({
    origin:"https://localhost:3000",
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['content-Type'],
}));
app.use(express.json());
app.get('/', (req, res) => {
    console.log(req);
    res.send("Hello");
})
app.use('/books',booksRoute);

mongoose
.connect(mongodburl)
.then(()=>{
console.log("connected");
app.listen(port,()=>{
    console.log(`listening on ${port}`);
});
})
.catch((error)=>{
console.log(error);
});