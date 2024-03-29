import { MongoClient } from "mongodb";

export default class ApiCallsCounter {
  constructor() {
    const client = new MongoClient(process.env.MONGODB_URI);
    const database = client.db('openai-proxy');
    this.stats = database.collection('stats');
  }

  async displayCalls() {
    let stat = await this.stats.findOne();
    if (stat.current_day !== new Date()) {
      stat = await this.resetCalls();
      console.log(stat);
    }
    return stat.calls;
  }

  async resetCalls() {
    const result = await this.stats.updateOne({}, {$set: {calls: 0, current_day: new Date()}})
    console.log(result);
    return await this.stats.findOne();
  }
}