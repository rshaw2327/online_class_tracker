// connect with the mongodb database
const {default:mongoose} = require("mongoose");
const connectDatabase = () => {
    mongoose
    .connect(
        process.env.DB_URI
    )
    .then((data) => {
        console.log(`mongodb connected with the server ${data.connection.host}`);

    })
    .catch((error)=>{
        console.log("error connecting to mongoDB",error)
    })

}

module.exports=connectDatabase
