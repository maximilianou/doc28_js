const express = require('express')
const router = express.Router()
const pool = require('../db/db.js')

router.get('/api/hello', (req, res) => {
	res.json('hello world')
})

router.get('/check/time', (req, res) => {
	;(async (req, res) => {
		const client = await pool.connect()
		try {
		  const resSql = await client.query(' SELECT NOW() ');
		  console.log(resSql.rows[0]);
		  res.json(resSql.rows[0]);
		} finally {
		  client.release();
		}
	  })(req, res).catch(err => {
		  console.log(err.stack);
		  res.json(err.stack);
		})
})

module.exports = router