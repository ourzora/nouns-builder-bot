# Nouns Builder Bot

This repo contains all of the code needed to spin up a Twitter/Discord bot that tracks Nouns Builder events. Right now if you were to run the code as is your bot
would tweet about events that are happening across all Nouns Builder DAOs. To change this and instead only tweet about events from a specific DAO you want to track
you will need to change the env variable `DAO_TOKEN_ADDRESS` from `"all"` to the DAO's token address.

## Twitter Bot

### Step 1 ~ Setting up your bot

First you will need to create a twitter account. Once you have made your twitter account you will then head to settings and add a phone number. A phone number is needed to access twitter's developer features.

Then head to https://developer.twitter.com/ and set up your first project. Once you have a twitter project set up you will then want to start saving the bot's tokens to your .env file.

### Step 2 ~ Changing the .ENV variables

These are the .env variables you will need:

- `TWITTER_API_KEY`
- `TWITTER_API_KEY_SECRET`
- `TWITTER_ACCESS_TOKEN`
- `TWITTER_ACCESS_TOKEN_SECRET`
- `RPC_URL` (you can get this from https://www.alchemy.com/)
- `DAO_TOKEN_ADDRESS` (keep as "all" if you want to track all DAOs or change to a specfic DAO token address that you want to track)
- `REDIS_URL` (ignore until you get to the deploying step)

### Step 3 ~ Deploying your bot

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

## Discord Bot

### Step 1 ~ Creating a Discord Bot

1. Make sure that you have a server setup that you want to add the bot to. If not, then create one first.
2. Head to https://discord.com/developers/applications to create your bot
3. Click the `New Application` button
4. Type in a name for your bot and click `create`
5. In the `General Information` tab add an app icon, name, and description for your bot
6. Head to the `bot` tab and click `add bot`
7. Copy the token and save this to your env variable `DISCORD_BOT_TOKEN`
8. Head to the `OAuth2` tab and go to the sub tab `URL Generator`
9. In `Scopes` select `bot` and in bot permissions select `send messages`
10. Copy the generated URL and paste it into your browser
11. Select the Discord server you want to add your bot into and invite it into your server

### Discord Environment variables

- `DISCORD_BOT_TOKEN` this is your bot's token
- `APPLICATION_ID` this is the channel id you want your bot to post messages in 
- `GUILD_ID` this is the server id that you want your bot to post messages in

## Running locally

1. run `yarn`
2. launch a redis server in a seperate terminal by running `redis-server`
3. run `yarn ts-node src/index.ts `
4. your bot should be up and running now!
