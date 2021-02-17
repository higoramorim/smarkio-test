const express = require('express');
const speechModel = require('./models/speechModel');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.get('/comments', async (_req, res) => {
  const comment = await speechModel.getAll();

  res.status(200).json(comment);
})

app.get('/comments/:id', async (req, res) => {
  const { id } = req.params;
  const comment = await speechModel.getById(id);

  if(!comment){
    throw boom.notFound(`comment ${id} not found`);
  }

  res.status(200).json(comment);
})

app.post('/comments', async (req, res) => {
  const { comment } = req.body;

  const getComment = await speechModel.add(comment);

  res.status(201).json(getComment);
})

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));

