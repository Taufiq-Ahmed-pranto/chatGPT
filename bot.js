const Telegram = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai")

const botToken = "5917438325:AAFUCWZbNIWxOpV4S1t1N9oPLqop_8ND0RI";
const openaiToken = "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";

const config = new Configuration({
    apiKey: openaiToken
})

const openai = new OpenAIApi(config)

const bot = new Telegram(botToken, { polling: true });


bot.on("message", async(msg) => {
    const chatId = msg.chat.id;

    const reply = await openai.createCompletion({
        max_tokens: 200,
        model: "ada",
        prompt: msg.text,
        temperature: 0.5
    })

    bot.sendMessage(chatId, reply.data.choices[0].text);
})