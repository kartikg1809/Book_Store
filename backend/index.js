import express from "express";
import {port,mongodburl} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";

const app=express();

app.use(express.json());
app.get('/', (req, res) => {
    console.log(req);
    res.send("Hello");
})
app.post('/books', async(req, res) => {
    try{
        if(!req.body.title||!req.body.author||!req.body.publishYear){
            return res.status(400).send({
                message:"Please enter all the fields"
            });
        }
        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        };
        const book=await Book.create(newBook);
        return res.status(200).send(book);
    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});

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