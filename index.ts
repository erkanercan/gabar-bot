import signale from "signale";
import {
  bizzatAnswers,
  selamAnswers,
  naberAnswers,
  replikAnswers,
  iyiBiriAnswers,
} from "./data/answers.data";
import { Telegraf } from "telegraf";

require("dotenv").config();

const GABAR_BOT_TOKEN = process.env.GABAR_BOT_TOKEN;
const bot = new Telegraf(GABAR_BOT_TOKEN);

// /start command
bot.command("start", (ctx) => {
  signale.info("/start triggered from @" + ctx?.from?.username + " at " + new Date());

  ctx.telegram
    .sendAnimation(
      ctx.message.chat.id,
      "https://media.giphy.com/media/v5h6OaL6tRe5YcwvAr/giphy.gif",
    )
    .then(() => {
      ctx.telegram
        .sendMessage(
          ctx.message.chat.id,
          `Hoşgeldin! Sen de artık bir Gabar veliahtısın.\n\n/start Gabarizmin engin bilgisine sahip olmak için komutların bir listesini görebilirsiniz.\n\n/selam - Gabarizm size bir selam verir. İyi gününüzdesiniz.\n\n/naber - Gabar'a bir naber kartı oynayıp engin bilgilerinden yararlanmaya çalışırsınız.\n\n/bizzat - Gabar ile bizzat kimin geleceğini tartışırsınız.\n\n/replik - GabarBot  size bir Gabar repliği fırlatır.\n\n/iyibiri - Kimin iyi biri olduğuna karar veremiyor musunuz? Bırakın Gabar sizin yerinize karar versin.`,
        )
        .catch((err) => signale.error("An error occurred when sending /start answer" + err));
    });
});

// /selam command
bot.command("selam", (ctx) => {
  signale.info("Sending selam answer to @" + ctx?.from?.username + " at " + new Date());

  ctx.telegram
    .sendMessage(ctx.message.chat.id, selamAnswers[Math.floor(Math.random() * selamAnswers.length)])
    .catch((err) => signale.error("An error occurred when sending /selam answer" + err));
});

// /naber command
bot.command("naber", (ctx) => {
  signale.info("Sending naber answer to @" + ctx?.from?.username + " at " + new Date());
  ctx.telegram
    .sendMessage(ctx.message.chat.id, naberAnswers[Math.floor(Math.random() * naberAnswers.length)])
    .catch((err) => signale.error("An error occurred when sending /naber answer" + err));
});

// /bizzat command
bot.command("bizzat", (ctx) => {
  signale.info("Sending bizzat answer to @" + ctx?.from?.username + " at " + new Date());

  ctx.telegram
    .sendMessage(
      ctx.message.chat.id,
      `Bizzat ${bizzatAnswers[Math.floor(Math.random() * bizzatAnswers.length)]}`,
    )
    .catch((err) => signale.error("An error occurred when sending /bizzat answer" + err));
});

// /replik command
bot.command("replik", (ctx) => {
  signale.info("Sending replik answer to @" + ctx?.from?.username + " at " + new Date());

  ctx.telegram
    .sendMessage(
      ctx.message.chat.id,
      replikAnswers[Math.floor(Math.random() * replikAnswers.length)],
    )
    .catch((err) => signale.error("An error occurred when sending /replik answer" + err));
});

// /iyibiri command
bot.command("iyibiri", (ctx) => {
  signale.info("Sending iyibiri answer to @" + ctx?.from?.username + " at " + new Date());

  ctx.telegram
    .sendMessage(
      ctx.message.chat.id,
      `${iyiBiriAnswers[Math.floor(Math.random() * iyiBiriAnswers.length)]} iyi biri`,
    )
    .catch((err) => signale.error("An error occurred when sending /iyibiri answer" + err));
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
