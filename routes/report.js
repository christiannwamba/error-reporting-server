const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  encrypted: true
});

/* Handle error by emitting realtime events */
router.post('/', (req, res, next) => {
  pusher.trigger('reports', 'error', req.body);
  res.send(req.body);
});

module.exports = router;
