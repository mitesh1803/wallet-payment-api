import mongoose from "mongoose"
// mongoose.connect(DB_URL)

const connectDB=async()=>{
try{
    await mongoose.connect(process.env.DB_URL)
    console.log("Database Connected")
}catch(e){
    console.log("Error",e.message)
    process.exit(1)
}
}

export default connectDB