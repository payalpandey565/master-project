import googleOAuth from "passport-google-oauth20";

import {UserModel} from "../database/allModels";

const GoogleStrategy=googleOAuth.Strategy;


export default (passport)=>{
  passport.use(
    new GoogleStrategy({
      clientID:"627117165042-hurnq1pgo6o3j10gda3mhjve5h7bupen.apps.googleusercontent.com",
      clientSecret:"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",
      callbackURL:"http://localhost:4000/auth/google/callback"
    },
    async(accessToken,refreshToken,profile,done)=>{
      //creating new user
      const newUser={
        fullname:profile.displayName,
        email:profile.emails[0].value,
        profilePic:profile.photos[0].value
      };
      try{
        //check whether user exists or not
        const user = await UserModel.findOne({email:newUser.email});

        if(user){
          //generating Jwt token
          const token = user.generateJwtToken();
          //return user
          done(null,{user,token});

        }else{
          //create new user
          const user= await UserModel.create(newUser);

          const token= user.generateJwtToken();

          //return user
          done(null,{user,token});
        }
      }
      catch(error){
        done(error,null);
      }

    }

  )
);

passport.serializeUser((userData,done)=>done(null,{...userData}));
passport.deserializeUser((id,done)=>done(null,id));
};
