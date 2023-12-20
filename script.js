const { OpenAI } = require('langchain/llms/openai');
const inquirer = require('inquirer')
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