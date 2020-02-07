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

// Posts

router.get('/api/allposts', (req, res, next) => {
  pool.query(' SELECT * FROM POSTS ORDER BY date_created DESC ', 
  (q_err, q_res)=>{
     res.json(q_res.rows);
  });
});

router.post('/api/postdb', (req, res, next) => {
  const values = [ req.body.title,
				   req.body.body,
				   req.body.uid,
				   req.body.username
				];
  pool.query(` INSERT INTO posts( title, body, user_id, author, date_created )VALUES( $1, $2, $3, $4, NOW() ) `, values, 
  (q_err, q_res) => {
	  if( q_err ){
        return next(q_err);
	  }else{
        req.json(q_res.rows);
	  }
  } );
});

// User Profile
router.post('/api/userprofiledb', (req, res, next) => {
  const values = [ req.body.profile.nickname,
				   req.body.profile.email,
				   req.body.profile.email_verified
				];
  pool.query(` INSERT INTO users(username, email, email_verified, date_created)VALUES( $1, $2, $3, NOW() ) ON CONFLICT DO NOTHING `, values, 
  (q_err, q_res) => {
     res.json(q_res.rows);
  });
});

router.get('/api/userprofiledb', (req, res, next) => {
  const email = req.query.email;
  console.log(email);
  pool.query(` SELECT * FROM users WHERE email = $1 `, [ email ], 
  (q_err, q_res)=>{
    res.json(q_res.rows);
  });
});

module.exports = router