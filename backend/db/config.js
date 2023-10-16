import mongoose from 'mongoose';
const connectDB = async () =>{

  try {
     const conn = await mongoose.connect("mongodb://127.0.0.1:27017/e-commerce",{ useNewUrlParser: true , useUnifiedTopology: true});
    console.log("database connected successfully");
  } catch (error){
    console.log("error while connecting with database" , error.message);
  }
}
export default connectDB;
