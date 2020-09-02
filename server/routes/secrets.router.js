const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated, rejectNonAdmirals
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, rejectNonAdmirals, (req, res) => {
  console.log('req.user:', req.user);

  if (req.user.clearance_level >= 4)  {
  pool
    .query(`SELECT * FROM "secret" WHERE "secrecy_level <= ${req.user.clearance_level});`)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
  }
});

module.exports = router;
