const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    image: Object
}, {
    collection: 'images',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Images', schema)