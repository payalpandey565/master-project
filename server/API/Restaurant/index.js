import {RestaurantModel} from "../../database/allModels";
import express from "express";

import {ValidateRestaurantCity,ValidateRestaurantSearchString} from "../../validation/restaurant";
import {ValidateRestaurantId} from "../../validation/food";


const Router=express.Router();

/*
Route    /
Descrip   get all restaurant
params    none
access    public
method    get
*/

Router.get("/",async(req,res)=>{
  try{
    await ValidateRestaurantCity(req.query);

    const{city}=req.query;
    const restaurants=await RestaurantModel.find({city});
    return res.json({restaurants});

  }
  catch(error){
    return res.status(500).json({error:error.message});
  }
});

/*
Route    /
Descrip   get particular restaurant
params   _id
access    public
method    get
*/

Router.get("/:_id",async(req,res)=>{
  try{
    await ValidateRestaurantId(req.params);
    const{id}=req.params;
    const restaurants=await RestaurantModel.findOne({_id});

    if(!restaurant)
    return res.status(404).json({error:"restaurant not found"});

    return res.json({restaurant});


  }
  catch(error){
    return res.status(500).json({error:error.message});
  }
});

/*
Route    /
Descrip   get restaurant details on search
params   none
body      searchString
access    public
method    get
*/

Router.get("/search",async(req,res)=>{
  try{

    await ValidateRestaurantSearchString(req.body);

    const{searchString}=req.body;
    const restaurants=await RestaurantModel.find({
      name:{$regex:searchString,$options:"i"},
    });
    return res.json({restaurants});

  }
  catch(error){
    return res.status(500).json({error:error.message});
  }
});

export default Router;
