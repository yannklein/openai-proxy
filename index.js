import OpenaiApi from './openai-api';

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to OpenAI API proxy server. X calls remaining today!');
});

app.post('/', (req, res) => {
  const { messages, format } = req.body;
  const openaiApi = new OpenaiApi();
  const completion = openaiApi(messages, format);
  res.json(completion);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});