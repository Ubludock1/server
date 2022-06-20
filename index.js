require("dotenv").config();
const config = require("config")
const host = process.env.HOST;
const port = process.env.PORT || 7000;

const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload');
const path = require('path');

const sequelize = require('./db/db');
const models = require("./models/models");

const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const filePathMiddleware = require('./middleware/filepath.middleware');
const path = require('path');

//middleware
app.use(cors());
app.use(filePathMiddleware(path.resolve(__dirname,'files')));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

//Handler error, last middleware
app.use(errorHandler);


const start = async () => {
   try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(port, () => {
            console.log(`App listening at http://${host}:${port}`);
        });
   } catch (e) {
       console.error(e);
   }
}
start();


