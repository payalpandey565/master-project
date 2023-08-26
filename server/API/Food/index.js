//libraries
import express from "express";
import passport from "passport";

import {FoodModel} from "../../database/allModels";

import {ValidateRestaurantId,ValidateCategory} from "../../validation/food";

const Router=express.Router();



/*
Route    /
Descrip   get all food based on particular restaurant
params    _id
access    public
method    get
*/

Router.get("/_id",async(req,res)=>{
  try{
    await ValidateRestaurantId(req.params);
    const {_id}=req.params;
    const foods=await FoodModel.find({restaurant:_id});
    return res.json({foods});
    }catch(error){
      return res.status(500).json({error:error.message});
    }
});

/*
Route    /r
Descrip   get all food based on category
params    category
access    public
method    get
*/

Router.get("/r/:category",async(req,res)=>{
  try{
      await ValidateCategory(req.params);
    const {category}=req.params;
    const foods=await FoodModel.find({
      category:{$regex:category,$options:"i"}
    });
    return res.json({foods});
    }
  catch(error){
    return res.status(500).json({error:error.message});
  }
});

export default Router;
