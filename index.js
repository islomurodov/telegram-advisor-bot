require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const fetch = require("node-fetch");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  const keyboard = Markup.keyboard(["New advice"]).resize();
  try {
    await fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((dt) =>
        ctx.replyWithHTML(`${dt.slip.advice}`, keyboard)
      );
  } catch (err) {
    throw err;
  }
});

bot.hears("New advice", async (ctx) => {
  try {
    await fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((dt) => ctx.reply(dt.slip.advice));
  } catch (err) {
    throw err;
  }
});

bot.launch();
