import { MongoClient } from "mongodb";

export default class ApiCallsCounter {
  #callLimit = 20;
  
  constructor() {
    const client = new MongoClient(process.env.MONGODB_URI);
    const database = client.db('openai-proxy');
    this.stats = database.collection('stats');
  }

  get callLimit() {
    return this.#callLimit;
  }

  async displayCalls() {
    let stat = await this.stats.findOne();
    // reset the call available if new day
    if (this.isNotToday(stat.current_day)) {
      stat = await this.resetCalls();
    }
    return stat.calls;
  }

  async autorizeCall() {
    let stat = await this.stats.findOne();
    // reset the call available if new day
    if (this.isNotToday(stat.current_day)) {
      stat = await this.resetCalls();
    }
    // unautorize if no more call available
    if (stat.calls >= this.#callLimit) {
      return false;
    }
    // remove one call as at least one is available
    const result = await this.stats.updateOne({}, {$set: {calls: stat.calls + 1}})
    console.log(result);
    return true;
  }

  async resetCalls() {
    await this.stats.updateOne({}, {$set: {calls: 0, current_day: this.todayMidnight()}})
    return await this.stats.findOne();
  }

  todayMidnight() {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  }  

  isNotToday(rawDate) {
    const someDay = new Date(rawDate);
    return someDay.getTime() !== this.todayMidnight().getTime();
  }
}