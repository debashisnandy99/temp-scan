const express = require('express')

const imgOcrRoutes = require('./routes/imgocr');
const multer = require('multer');
const uuid = require('uuid4');
const bodyParser = require('body-parser')
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.use(bodyParser.json());

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        //console.log(uuid() + "_" + file.originalName.toString().split("."));
        
        cb(null, uuid() + "_" + file.originalname);
    }
});

const fileFilter = (req, file, cb) =>
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ?
    cb(null, true) :
    cb(null, false);


app.use(multer({
    storage: fileStorage,

    fileFilter: fileFilter
}).single("images"));



app.use('/img',imgOcrRoutes);


app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message: message
    });
});


app.listen(process.env.PORT || 3000);