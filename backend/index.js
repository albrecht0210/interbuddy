const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const openai = require('./openai');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})