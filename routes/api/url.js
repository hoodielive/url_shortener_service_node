const express = require('express');
const router = express.Router();
const validURL = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../../models/Url');

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', async (req, res) => {
  const { longURL } = req.body;
  const baseURL = config.get('baseURL');

  // Check base url
  if (!validURL.isUri(baseURL)) {
    return res.status(401).json('Invalid base url');
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validURL.isUri(longURL)) {
    try {
      let url = await Url.findOne({ longURL });

      if (url) {
        res.json(url);
      } else {
        const shortURL = baseURL + '/' + urlCode;

        url = new Url({
          longURL,
          shortURL,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});

module.exports = router;
