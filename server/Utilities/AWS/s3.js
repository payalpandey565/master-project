
import AWS from "aws-sdk";




//aws s3 bucket config
const s3Bucket= new AWS.S3({
  accessKeyId:"AKIA5BAWXCUGHMWSABIU",
  secretAccessKey:"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",
  region:"ap-south-1"
});

export const s3Upload=(options)=>{
  return new Promise((resolve,reject)=>
    s3Bucket.upload(options,(error,data)=>{
      if(error) return reject(error);
      return resolve(data);
    })
  );
};
