import OpenAI from "openai";

export default class {
  constructor() {
    this.openai = new OpenAI();
  }

  async call(messages, format) {
    const completion = await this.openai.chat.completions.create({
      response_format: format,
      messages: messages,
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0];
  }
}