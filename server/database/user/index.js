import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  fullname:{type:String, required:true},
  email:{type:String, required:true},
  password:{type:String},
  address:[{detail:{type:String},for:{type:String}}],
  phoneNumber:[{type:Number}]
},

  {
    timestamps:true
  }
);

UserSchema.methods.generateJwtToken= function() {
  return jwt.sign({user:this._id.toString()},"ZomatoApp");
};

UserSchema.statics.findEmailAndPhone = async ({ email , phoneNumber }) =>{
  //check whether email exists
  const checkUserByEmail=await UserModel.findOne({email});

    const checkUserByPhone=await UserModel.findOne({phoneNumber});

    if(checkUserByEmail|| checkUserByPhone){
      throw new Error("user already exists");
    }
    return false;
};
UserSchema.statics.findByEmailAndPassword = async ({ email , password }) =>{
  //check whether email exists
  const user =await UserModel.findOne({email});

  if(!user){
    throw new Error("user does not exist");
  }

    const doesPasswordMatch =await bcrypt.compare(password,user.password);

    if(!doesPasswordMatch){
      throw new Error("invalid password");
    }
    return user;
};

UserSchema.pre("save",function(next){
  const user=this;

  //password is not Modified
  if(!user.isModified("password")) return next();

  //generating bcrypt salt
  bcrypt.genSalt(8,(error,salt)=>{
    if(error) return next(error);

    //hashing pass
      bcrypt.hash(user.password,salt,(error,hash)=>{
        if(error) return next (error);

          //assigning hash password
          user.password=hash;
          return next();
      });
    });
  });

export const UserModel = mongoose.model("Users",UserSchema);
