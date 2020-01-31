const express = require('express')
const connectDB = require('./config/db')
const app = express()


// Connect to Database.
connectDB();

app.use(express.json({ extended: false }))

// Define Routes
app.use('/', require('./routes/api/index'))
app.use('/api/url', require('./routes/api/url'))

// Port(s)
const PORT = 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
