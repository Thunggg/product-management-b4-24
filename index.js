const express = require('express');
require('dotenv').config();

const routeClient = require("./routes/client/index.route.js");

const app = express();
const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

routeClient.index(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});