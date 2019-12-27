const express = require('express')
const router = express.Router()

const URL = require('../../models/Url')

// @route       GET /:code
// @desc        Redirect to long/original URL
router.get('/:code', async (req, res) => {
    try {
        const url = await URL.findOne({ urlCode: req.params.code })

        if (url) {
            return res.redirect(url.longURL)
        }
        else {
            return res.status(404).json({ message: 'No URL found.'})
        }
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error.'})
    }
})

module.exports = router