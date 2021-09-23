const express = require('express');
const app = express.Router();

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    }
    , filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});

const upload = multer({storage: storage});

app.post('/uploadFile', upload.array('photos', 5), (req, res) => {;
    console.log('uploadFile backend ',req.body);
    res.end();
})

app.get('/items/download-image/:imageName', (req, res) => {
    var image = path.join(__dirname + '../../uploads', req.params.imageName);

    if (fs.existsSync(image)) {
        res.sendFile(image)
    }
    else {
        res.end("Image not found")
    }
});

module.exports = {
    uploadDownload: app,
    storage: storage,
    upload: upload
};