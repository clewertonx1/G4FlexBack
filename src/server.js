const express = require("express");
const cors = require("cors")

const allRoutes = require("./g4.routes")

const app = express();
app.use(cors()); 
 console.log(cors())
app.use(express.json());
app.use(allRoutes);

app.get("/g4", (req,res) => {
    return res.json("up");
});

app.listen(3333, () => console.log("server up in 3333")); 