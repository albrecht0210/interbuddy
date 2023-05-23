const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: "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",
})

const openai = new OpenAIApi(config);

module.exports = openai;