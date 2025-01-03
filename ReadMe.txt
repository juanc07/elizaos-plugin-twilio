#The ENV file should contain this information

# Cache Configs
CACHE_STORE=database

# Discord Configuration
DISCORD_APPLICATION_ID=
DISCORD_API_TOKEN=

# AI Model API Keys
OPENAI_API_KEY=

# Twitter/X Configuration
TWITTER_USERNAME=
TWITTER_PASSWORD=
TWITTER_EMAIL=
TWITTER_POLL_INTERVAL=120       # How often (in seconds) the bot should check for interactions
TWITTER_SEARCH_ENABLE=FALSE     # Enable timeline search, WARNING this greatly increases your chance of getting banned
#TWITTER_TARGET_USERS=

# Twilio Part
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Server Configuration
SERVER_PORT=3000

# How to use
1. create your .env file , if you don't have it yet and then populate it with the information above, make sure to fill in all information
2. Add this project into your eliza os project under packages
3. using terminal go inside plugin-twilio then type pnpm install twilio
4. go inside your agent folder update the package.json add this "@elizaos/plugin-twilio": "workspace:*"
5. add this inside your Agent index.ts import { twilioPlugin } from "@elizaos/plugin-twilio";
6. Add twilioPlugin in Agent Runtime still inside Agent index.ts
7. pnpm install
8. pnpm build
9. pmpn start --character="characters/nameofyouragentcharacterfile.character.json"

#Note: Make sure you have a twilio developer account and it is verified with verified phone number and have enough credits but they provide free small credits when your account is new
visit twilio: https://www.twilio.com
twilio quick start guides: https://www.twilio.com/docs/messaging/quickstart
twilio documentation: https://www.twilio.com/docs/messaging