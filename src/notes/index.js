const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send(`Hello Notes! <br/>[${ (new Date).toISOString()}]`)
})

app.listen(3000)
