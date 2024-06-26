npm init -y (initializing)

requiring = ejs, mongoose, express , 

//basic setup

=> {
    const express = require("express);
    const app = express();
    const mongoose = require("mongoose");
    const port = 8000;

    main().catch(err => console.log(err));

    async function main() {
      await mongoose.connect('mongodb://127.0.0.1:27017/test');
    }

    app.listen(port, ()=> {
        console.log("server started");
    });

}


//basic setup

starting mongo shell = mongosh
# if the command gives an error type (sudo systemctl start mongod)