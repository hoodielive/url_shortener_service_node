const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
	id: Number,
	urlCode: String,
	longURL: String,
	shortURL: String,
	date: { type: String, default: Date.now }
})

module.exports = mongoose.model('Url', urlSchema)
