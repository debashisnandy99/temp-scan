const tesseract = require("node-tesseract-ocr")
const path = require('path')
const fs = require('fs')

exports.startOcr = (req, res, next) => {
    console.log(req.body.title);

    if (!req.file) {
        const error = new Error("No Image Provided");
        error.statusCode = 422;
        error.message = "Image not found";
        throw error;
    }
    const filePath = req.file.path;
    console.log(filePath);
    const config = {
        lang: "eng",
        oem: 1,
        psm: 3,
    }
    tesseract.recognize(filePath, config)
        .then(text => {

            res.status(201).json({
                message: text,
            });
            clearImage(filePath)
        })
        .catch(errorTcr => {
            const error = new Error("No Image Provided");
            error.statusCode = 422;
            error.message = "tessarect error";
            throw error;
        });

}

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => {
        console.log(err);
    });
}