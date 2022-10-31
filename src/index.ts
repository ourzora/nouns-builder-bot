import "dotenv/config";
import { schedule } from "node-cron";
import { redis, redisClient, rpcProvider, twitterClient } from "./config";
import { fetchEvents } from "./fetch/fetchEvents";
import { messages } from "./twitter";

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
      const message = await messages(events[i]);
      twitterClient.tweetsV2
        .createTweet({
          text: message,
        })
        .catch((err) => console.log(err));
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

console.log("schedule tick");
schedule("* * * * *", function () {
  tick();
});
