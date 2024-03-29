import express from 'express';
import OpenaiApiClient from './openai-api';

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to OpenAI API proxy server. X calls remaining today!');
});

app.post('/', async (req, res) => {
  console.log(req.body);
  const { messages, format } = req.body;
  const OpenaiApi = new OpenaiApiClient();
  const completion = await OpenaiApi.call(messages, format);
  res.send(completion);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});