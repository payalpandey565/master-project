
import {ImageModel} from "../../database/allModels";
import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

const Router=express.Router();

import {s3Upload} from "../../Utilities/AWS/s3";

//multer config
const storage =multer.memoryStorage();
const upload= multer({storage});




/*
Route    /
Descrip  uploading given img to s3 bucket and then saving the file to mongodb
params    file
access    public
method    post
*/

Router.post("/",upload.single("file"),async(req,res)=>{
  try{
    const file = req.file;

    //s3 bucket options
    const bucketOptions={
      Bucket:"payal123",
      Key:file.originalname,
      Body:file.buffer,
      ContentType:file.mimetype,
      ACL:"public-read"
    };

    const uploadImage = await s3Upload(bucketOptions);
    return res.status(200).json({uploadImage});


  }
  catch(error){
    return res.status(500).json({error:error.message});
  }
});

export default Router;
