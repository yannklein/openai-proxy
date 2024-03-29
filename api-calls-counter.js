import { MongoClient } from "mongodb";

export default class ApiCallsCounter {
  constructor() {
    const client = new MongoClient(process.env.MONGODB_URI);
    const database = client.db('openai-proxy');
    this.stats = database.collection('stats');
  }

  async displayCalls() {
    const stat = await this.stats.findOne();
    return stat.calls;
  }
}