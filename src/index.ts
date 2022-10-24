import "dotenv/config";
import { schedule } from "node-cron";
import { redis, redisClient, rpcProvider, twitterClient } from "./config";
import { fetchDaoDeployedEvents } from "./fetch/fetchManagerEvents";
import { createMessageDaoDeployed } from "./twitter";

const tick = async () => {
  try {
    const latestBlock = (await rpcProvider.getBlockNumber()) - 4;
    var fromBlock = await redisClient.get("block");

    if (fromBlock == null) {
      redisClient.set("block", latestBlock + 1, redis.print);
      fromBlock = latestBlock;
    }

    if (fromBlock > latestBlock) {
      fromBlock = latestBlock;
    }

    console.log("latest block -> ", latestBlock);
    console.log("from block -> ", fromBlock);

    const daos = await fetchDaoDeployedEvents(fromBlock, latestBlock);
    for (const i in daos) {
      const message = await createMessageDaoDeployed(daos[i]);
      twitterClient.tweetsV2
        .createTweet({
          text: message,
        })
        .catch((err) => console.log(err));
    }

    redisClient.set("block", latestBlock + 1, redis.print);
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
