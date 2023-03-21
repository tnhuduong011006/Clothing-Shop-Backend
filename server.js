const { Collection } = require("mongoose");
const app = require("./app");
const config = require("./app/config")
const MongoDB = require("./app/utils/mongodb.util")
let db=null

async function startServer() {
    try {
        await MongoDB.connect(config.db.uri)
        console.log("Connected to the database!")
        
        //start server
        const PORT = config.app.port;
        app.listen(PORT, () =>{
            console.log(`server is running on port ${PORT}`)
        })
    }
    catch (error) {
        console.log("Cannot connect to the database!", error)
        process.exit()
    }
}

startServer()
