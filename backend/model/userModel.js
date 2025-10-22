import mongoose from "mongoose";

const userinfoSchema = new mongoose.Schema({
      username:{
        type:String,
        required:true,
        unique:true
      },
      Email:{
        type:String,
        required:true,
        unique:true
      },
     password:{
        type:String,
        required:true,
      },
});
const userInfo = mongoose.model('userInfo',userinfoSchema);
export default userInfo;