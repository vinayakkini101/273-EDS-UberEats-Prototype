const express = require('express');
const app = express.Router();

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const s3 = require('../AWS/s3_listbuckets.js');
const multerS3 = require('multer-s3');

const upload = multer({
    storage: multerS3({
        acl: 'public-read',
        s3: s3,
        bucket: 'ubereats-app',
        key: function (req, file, cb) {
            cb(null, file.originalname);
      }
    })
  })

app.post('/uploadFile', upload.array('photos', 5), (req, res) => {;
    console.log('uploadFile to s3 ',req.body);
    res.end();
})

module.exports = {
    uploadDownload: app,
    upload: upload
};