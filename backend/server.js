const app =  require("./app");
const dotenv = require("dotenv");
const dbConn = require("./config/database")


process.on("uncaughtException",(err)=>{
    console.log(`Shutting down server due to uncaughtException: ${err.message}`)

    
        process.exit(1);
    
})

dotenv.config({path:"backend/config/config.env"})
dbConn();

const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is listening at http://localhost:${process.env.PORT}`)
})

process.on("unhandledRejection",(err)=>{
    console.log(`Shutting down server due to unhandled Exception: ${err.message}`)

    server.close(()=>{
        process.exit(1);
    })
})


