#The ENV file should contain this

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

TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Server Configuration
SERVER_PORT=3000

# How to use
1. Add this project into your eliza os project under packages
2. using terminal go inside plugin-twilio then type pnpm install twilio
3. go inside your agent folder update the package.json add this "@elizaos/plugin-twilio": "workspace:*"
4. add this inside your Agent index.ts import { twilioPlugin } from "@elizaos/plugin-twilio";
5. Add twilioPlugin in Agent Runtime still inside Agent index.ts
6. pnpm install
7. pnpm build
8. pmpn start --character="characters/nameofyouragentcharacterfile.character.json"