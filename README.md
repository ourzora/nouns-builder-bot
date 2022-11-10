# Nouns Builder Twitter Bot


This repo contains all of the code needed to spin up a Twitter bot that tracks Nouns Builder events. Right now if you were to run the code as is your twitter bot
would tweet about events that are happening across all Nouns Builder DAOs. To change this and instead only tweet about events from a specific DAO you want to track
you will need to change the env variable `DAO_TOKEN_ADDRESS` from `"all"` to the DAO's token address.


## Step 1 ~ Setting up your bot

First you will need to create a twitter account. Once you have made your twitter account you will then head to settings and add a phone number. A phone number is needed to access twitter's developer features.

Then head to https://developer.twitter.com/ and set up your first project. Once you have a twitter project set up you will then want to start saving the bot's tokens to your .env file.


## Step 2 ~ Changing the .ENV variables

These are the .env variables you will need:

- `TWITTER_API_KEY`
- `TWITTER_API_KEY_SECRET`
- `TWITTER_ACCESS_TOKEN`
- `TWITTER_ACCESS_TOKEN_SECRET`
- `RPC_URL` (you can get this from https://www.alchemy.com/)
- `DAO_TOKEN_ADDRESS` (keep as "all" if you want to track all DAOs or change to a specfic DAO token address that you want to track)
- `REDIS_URL` (ignore until you get to the deploying step)


## Step 3 ~ Deploying your bot

There are many different services that you can use to deploy but we will focus on Railway. 

1. Head to https://railway.app/
2. Go to your dashboard and click the `New Project` button
3. Select `Deploy From Repo` (make sure you have put your bot on github! private repos are okay too)
4. Select the repo with your bot
5. Add your environment variables
6. Now that your bot is being deployed next head to the `add plugin` button under Environment 
7. Click add Redis
8. Click on your redis plugin and go to the `connect` tab
9. Copy your `redis connection url`
10. Go to your variables and paste the `redis connection url` in your `REDIS_URL` env variable
11. Wait for the changes to update and redeploy
12. Your bot should be working now!