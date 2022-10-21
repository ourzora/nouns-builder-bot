import { ethers } from "ethers";
import { TwitterClient } from "twitter-api-client";

export const twitterClient = new TwitterClient({
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

export const rpcProvider = new ethers.providers.JsonRpcProvider({
  url: process.env.RPC_URL,
  timeout: 2000,
});

export const redis = require("redis");
export const redisClient = redis.createClient({ url: process.env.REDIS_URL });
