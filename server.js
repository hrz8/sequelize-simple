const express = require('express');

const { Sequelize } = require('sequelize');

const dbConfig = require('./db/config');

const seq = new Sequelize(dbConfig.development);

const app = express();

app.use(express.json())

app.get('/health', function(req, res) {
  res.json({
    ok: true,
  });
});

app.post('/todos', async function(req, res) {
  await seq.query(`
    insert into todos (
      user_id,
      title,
      is_completed
    ) values (
      1,
      '${req.body.title}',
      ${req.body.is_completed}
    )`);

  res.json({
    ok: true,
  });
});

app.get('/todos', async function(req, res) {
  const result = await seq.query('select * from todos');

  res.json(result[0]);
});

app.put('/todos/:id', async function(req, res) {
  await seq.query(`update todos set is_completed = 1 where id = ${req.params.id}`);
  res.json({ok:true})
});

app.delete('/todos/:id', async function(req, res) {
  await seq.query(`delete from todos where id = ${req.params.id}`);
  res.json({ok:true});
})

app.listen(3000);
