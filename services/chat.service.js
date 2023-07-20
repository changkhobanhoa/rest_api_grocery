const { chat } = require("../models/chat.model");
var async = require("async");
async function addChat(params, callback) {
  if (!params.message) {
    return callback({ message: "Message Required" });
  }
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  try {
    const message = req.body.message;
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    req.body.botResponse = chatCompletion.data.choices[0].message;
  } catch (error) {
    if (error.response) {
      return callback(error.response);
    } else {
      return callback(error.message);
    }
  }

  const chatModel = new chat(params);
  chatModel
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}
module.exports = {
  addChat,
};
