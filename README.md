<h2 align="center">
    MxConsole v1.20.4
</h2>

<p align="center">
    <img src="MxConsole2.png" alt="MxConsole Logo" width="200"/>
</p>

MxConsole is a versatile Discord bot designed to enhance the SriCraft Minecraft server with advanced features, professional commands, and custom functionalities.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
  - [/bug-report](#bug-report)
  - [/changelogs](#changelogs)
  - [/ip](#ip)
  - [/help](#help)
  - [/feedback](#feedback)
  - [/myid](#myid)
  - [/ping](#ping)
  - [/player-report](#player-report)
  - [/serverinfo](#serverinfo)
  - [/website](#website)
- [Error Logging](#error-logging)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Professional Ping Command with Embeds and Emojis
- Feedback System with Star Ratings and Staff Mentions
- Changelog Display with Navigation
- Custom Status Rotations
- Error Logging to Discord via Webhook
- Minecraft Server Website Display
- Player Reports Management

## Installation

To run MxConsole on your own server, follow these steps:

  ### Step 1: Clone the Repository:

  ```sh
  git clone https://github.com/lordskidgod/MxConsole.git
  cd MxConsole
  ```

 ### Step 2: Install the Dependencies:
 ```sh
 npm install
 ```

 ### Step 3: Replace the Token and Other Dependencies Inside
 - Open the `.env` file in the root directory.
 - Replace the placeholders with your actual Discord bot token, client ID, guild ID, and error webhook URL:
  
 ```sh
 TOKEN: 'DISCORD_BOT_TOKEN',          // Replace with your bot token
 CLIENT_ID: 'PASTE_CLIENT_ID',        // Replace with your client ID
 GUILD_ID: 'PASTE_GUILD_ID',          // Replace with your guild ID
 ERROR_WEBHOOK_URL: 'WEBHOOK_URL'     // Replace with your error webhook URL
  ```

  ### Step 4: Register Slash Commands

  To register the bot's slash commands, use the following command:

  ```js
  node src/register-commands.js
  ```

  ### Step 5: Run the Bot:
   ```js
   node src/index.js
   ```

## Usage

### Starting the Bot

To start the bot, use the following command:

```sh
node src/index.js
```
> ⚠️ Caution We have discontinued updates for this project. IVON is now on a different code base, and currently we do not
### Reloading Slash Commands

To reload the bot's slash commands, use the following command:

```sh
node src/register-commands.js
```

<h6 align="center">©️ PROJECT | CN DEVELOPMENT UNIT</h6>

