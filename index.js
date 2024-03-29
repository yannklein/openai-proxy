import'dotenv/config';
import express from 'express';
import OpenaiApiClient from './openai-api';
import ApiCallsCounter from './api-calls-counter';

const app = express();

app.use(express.json());

const apiCallsCounter = new ApiCallsCounter();

app.get('/', async (req, res) => {
  try {
    const amountCalls = await apiCallsCounter.displayCalls();
    res.send(`Welcome to OpenAI API proxy server. ${10 - amountCalls} calls remaining today!`);
    
  } catch (error) {
    res.send("Some error occured: " + error)
  }
});

app.post('/', async (req, res) => {
  const { messages, format } = req.body;
  const openaiApi = new OpenaiApiClient();
  const completion = await openaiApi.call(messages, format);
  res.send(completion);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});