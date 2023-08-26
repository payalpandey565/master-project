import {ReviewModel} from "../../database/allModels";
import express from "express";

const Router=express.Router();

/*
Route    /new
Descrip   add new review
params   none
body     review object
access    public
method    post
*/

Router.post("/new",async(req,res)=>{
  try{
    const{reviewData}=req.body;
    await ReviewModel.create(reviewData);

    return res.json({review:"created"});

  }
  catch(error){
    return res.status(500).json({error:error.message});
  }
});

/*
Route    /delete
Descrip   delete review
params   _id
access    public
method    delete
*/

Router.delete("/delete/:_id",async(req,res)=>{
  try{
    const{_id}=req.params;
    await ReviewModel.findByIdAndDelete(_id);

    return res.json({review:"deleted"});

  }
  catch(error){
    return res.status(500).json({error:error.message});
  }
});

export default Router;
