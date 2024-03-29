import OpenAI from "openai";

export default class  {
  constructor() {
    this.openai = new OpenAI();
  }

  async call(promptArray) {
    const completion = await this.openai.chat.completions.create({
      messages: promptArray,
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0];
  }
}