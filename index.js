const express = require('express')
const connectDB = require('./config/db')
const app = express()

app.use(express.json({ extended: false }))

// Connect to Database.
connectDB(); 

const PORT = 5000 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
