// KAYNAK => 
// https://medium.com/toprakio/node-js-ile-resim-y%C3%BCkleme-i%CC%87%C5%9Flemini-y%C3%B6netmek-a5bb1f9a7833
require('dotenv').config()
const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const fs = require('fs')

const Images = require('./model')

const app = express()


mongoose.set("strictQuery", false);
db_connection = 'mongodb+srv://feyza:mongodb123@cluster1.f6lqc.mongodb.net/file-upload'
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => { console.log('DB Connection') })
    .catch(err => console.error(err))
// “dest” parametresi isteğin içerisinde gelen dosyaları nereye upload edeceğimizi belirtiyor.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, `${req.params.filename}-${Date.now()}`)
    }
})
var upload = multer({ storage: storage })

app.post('/:filename', upload.single('avatar'), async (req, res, next) => {
    const { path, mimetype } = req.file
    //“path” değişkeni yüklenen dosyanın dizinini 
    //“mimetype” ise yüklenen dosyanın tipi
    const img = fs.readFileSync(path)
    const encodedImg = img.toString('base64')
    const finalImg = {
        contentType: mimetype,
        image: Buffer(encodedImg, 'base64')
    }
    await Images({
        name: "test",
        image: finalImg
    }).save()
    res.sendStatus(200)
})

app.get('/:filename', async (req, res, next) => {
    const doc = await Images.findById("63c7f23a8dbca11b0023bc57")
    res.contentType('image/png')
    res.send(doc.image.buffer)
})

app.listen(3000, () => {
    console.log("Server running")
})