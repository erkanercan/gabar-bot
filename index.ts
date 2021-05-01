import signale from "signale";
import {
  bizzatAnswers,
  selamAnswers,
  naberAnswers,
  replikAnswers,
  iyiBiriAnswers,
} from "./data/answers.data";
import { Telegraf } from "telegraf";
import express from "express";
const expressApp = express();

require("dotenv").config();

const GABAR_BOT_TOKEN = process.env.GABAR_BOT_TOKEN;
const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

expressApp.listen(PORT, () => {
  signale.info(`Listening on port ${PORT}`);
});

const bot = new Telegraf(GABAR_BOT_TOKEN);

// /selam command
bot.command("selam", (ctx: any) => {
  signale.info("Sending selam answer to @" + ctx?.from?.username + " at " + new Date());

  ctx.telegram.sendMessage(
    ctx.message.chat.id,
    selamAnswers[Math.floor(Math.random() * selamAnswers.length)],
  );
});

// /naber command
bot.command("naber", (ctx: any) => {
  signale.info("Sending naber answer to @" + ctx?.from?.username + " at " + new Date());
  ctx.telegram.sendMessage(
    ctx.message.chat.id,
    naberAnswers[Math.floor(Math.random() * naberAnswers.length)],
  );
});

// /bizzat command
bot.command("bizzat", (ctx: any) => {
  signale.info("Sending bizzat answer to @" + ctx?.from?.username + " at " + new Date());

  ctx.telegram.sendMessage(
    ctx.message.chat.id,
    `Bizzat ${bizzatAnswers[Math.floor(Math.random() * bizzatAnswers.length)]}`,
  );
});

// /replik command
bot.command("replik", (ctx: any) => {
  signale.info("Sending replik answer to @" + ctx?.from?.username + " at " + new Date());

  ctx.telegram.sendMessage(
    ctx.message.chat.id,
    replikAnswers[Math.floor(Math.random() * replikAnswers.length)],
  );
});

// /iyibiri command
bot.command("iyibiri", (ctx: any) => {
  signale.info("Sending iyibiri answer to @" + ctx?.from?.username + " at " + new Date());

  ctx.telegram.sendMessage(
    ctx.message.chat.id,
    `${iyiBiriAnswers[Math.floor(Math.random() * iyiBiriAnswers.length)]} iyi biri`,
  );
});

try {
  bot.launch();
  signale.success("Bot started.");
} catch (error) {
  signale.fatal(error);
}

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

//selam - Gabarizm size bir selam verir. İyi gününüzdesiniz.
//naber - Gabar'a bir naber kartı oynayıp engin bilgilerinden yararlanmaya çalışırsınız.
//bizzat - Gabar ile bizzat kimin geleceğini tartışırsınız.
//replik - GabarBot  size bir Gabar repliği fırlatır.
//iyibiri - Kimin iyi biri olduğuna karar veremiyor musunuz? Bırakın Gabar sizin yerinize karar versin.
