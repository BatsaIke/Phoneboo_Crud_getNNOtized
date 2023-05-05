const express= require('express')
const app = express()
const phoneBook = require('./routes/PhoneBookRoute')
require('dotenv').config();
const PORT = process.env.PORT || 5100;
const connectDB = require('./db')
const cors = require("cors");
 
 connectDB()
 app.use(express.json({ extended: false }));
 app.use(cors());
 app.use("/api/v1/phonebook", phoneBook);  


app.get("/", (req, res) => res.send("Api is running"));
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));