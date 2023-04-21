const express = require('express');
const cors = require('cors');
const { connection } = require('./configs/db');
const { petRouter } = require('./routes/user.router');
const { adminRouter } = require('./routes/admin.router');
require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.json());


app.get('/',(req, res) => {
    res.send({msg:'basic API endpoint'});
})

app.use('/pet',petRouter);
app.use('/admin',adminRouter);

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log('connected to DB');
    }
    catch (error) {
        console.log(error);
    }
    console.log(`Running at ${process.env.port}`);
})