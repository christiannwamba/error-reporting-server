const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '355221',
  key: '5c18d0c0570fe1b75193',
  secret: '93daa59ce33b4804fe81',
  encrypted: true
});

/* Handle error by emitting realtime events */
router.post('/', (req, res, next) => {
  pusher.trigger('reports', 'error', req.body);
  res.send(req.body);
});

module.exports = router;
