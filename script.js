const { OpenAI } = require('langchain/llms/openai');
const inquirer = require('inquirer');
const { PromptTemplate } = require("langchain/prompts");
require('dotenv').config();
require('web-streams-polyfill');

const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: 'gpt-3.5-turbo'
});

console.log({ model });

const promptFunc = async (input) => {

    try {
      const res = await model.call(input);
      console.log(res);

      const prompt = new PromptTemplate({
        template: "You are a javascript expert and will answer the user’s coding questions thoroughly as possible.\n{question}",
        inputVariables: ["question"],
      });
      const promptInput = await prompt.format({
        question: input
      });

    }
    catch (err) {
      console.error(err);
    }

};

const init = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Ask a coding question:',
      },
    ]).then((inquirerResponse) => {
      promptFunc(inquirerResponse.name)
    });
  };

init();

