const express = require('express');

const { Sequelize } = require('sequelize');

const dbConfig = require('./db/config');

const seq = new Sequelize(dbConfig.development);

const app = express();

app.get('/health', function(req, res) {
  res.json({
    ok: true,
  });
});

app.listen(3000);
