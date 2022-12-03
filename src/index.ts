import "dotenv/config";
import { schedule } from "node-cron";
import {
  discordBot,
  redis,
  redisClient,
  rpcProvider,
  twitterClient,
} from "./config";
import { fetchEvents } from "./fetch/fetchEvents";
import { discordMessages } from "./messages/discord";
import { twitterMessages } from "./messages/twitter";
import { TextChannel } from "discord.js";

const tick = async () => {
  try {
    const endBlock = (await rpcProvider.getBlockNumber()) - 6;
    var startBlock = parseInt(await redisClient.get("block"));

    if (startBlock == null) {
      redisClient.set("block", endBlock + 1, redis.print);
      startBlock = endBlock;
    }

    if (startBlock > endBlock) {
      startBlock = endBlock;
    }

    console.log("start block -> ", startBlock);
    console.log("end block -> ", endBlock);

    const events = await fetchEvents(startBlock, endBlock);
    for (const i in events) {
      twitterClient.tweetsV2
        .createTweet({
          text: await twitterMessages(events[i]),
        })
        .catch((err) => console.log(err));
      // (
      //   discordBot.channels.cache.get(process.env.APPLICATION_ID) as TextChannel
      // ).send({ embeds: [await discordMessages(events[i])] });
    }

    redisClient.set("block", endBlock + 1, redis.print);
  } catch (error) {
    console.log(error);
  }
};

// connect to redis
redisClient.connect();
redisClient.on("error", function (error) {
  console.error(error);
  process.exit(1);
});

// connect discord bot
discordBot.login(process.env.DISCORD_BOT_TOKEN).then(() => {
  console.log("logged in!");
});
discordBot.on("ready", () => {
  console.log("bot is ready");
});

console.log("schedule tick");
schedule("* * * * *", function () {
  tick();
});
