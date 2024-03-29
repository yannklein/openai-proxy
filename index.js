import'dotenv/config';
import express from 'express';
import OpenaiApiClient from './openai-api.js';
import ApiCallsCounter from './api-calls-counter.js';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    // const apiCallsCounter = new ApiCallsCounter();
    // const amountCalls = await apiCallsCounter.displayCalls();
    // res.send(`Welcome to OpenAI API proxy server. ${apiCallsCounter.callLimit - amountCalls} calls remaining today!`);
    res.send("hi")
  } catch (error) {
    res.send("Some error occured: " + error)
  }
});

app.post('/', async (req, res) => {
  const apiCallsCounter = new ApiCallsCounter();
  if ( await apiCallsCounter.autorizeCall()) {
    const { messages, format } = req.body;
    const openaiApi = new OpenaiApiClient();
    const completion = await openaiApi.call(messages, format);
    res.send(completion);
  } else {
    res.send('{"error": "No more call available for today"}');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});