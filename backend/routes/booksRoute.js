import express from "express";
import {Book} from "../models/bookModel.js";

const router=express.Router();
router.get('/', async(req, res) => {
    try{
        const book=await Book.find({});
        return res.status(200).send(book);
    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});
router.get('/:id', async(req, res) => {
    try{
        const {id}=req.params;
        const book=await Book.findById(id);
        return res.status(200).send(book);
    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});
router.put('/:id', async(req, res) => {
    try{
        if(!req.body.title||!req.body.author||!req.body.publishYear){
            return res.status(400).send({
                message:"Please enter all the fields"
            });
        }
        const {id}=req.params;
        
        const result=await Book.findByIdAndUpdate(id,req.body);
        if(!result){
            res.status(404).send({message:"Book Not found"})
        }
        return res.status(200).send({message:"updated"});
    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});
router.delete('/:id', async(req, res) => {
    try{
        const {id}=req.params;
        const book=await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).send({message:"Book Not found"});
        }
        return res.status(200).send({message:"Book deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});
router.post('/', async(req, res) => {
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

export default router;