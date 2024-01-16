const express = require("express");
const { generateToken } = require("./tokenValidator");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;
app.post("/admin/authenticate", async (req, res) => {
    const obj = req.body;
    console.log(obj);
    try
    {
        const token = await generateToken(obj);
        res.status(200).send({"token": token});
    }
    catch (err)
    {
        res.status(400).send({"token": err});
    }
    
});

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
})