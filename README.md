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

> These are the features that makes you wanna use our bot. Check it out!
>

- Professional Ping Command with Embeds and Emojis
- Feedback System with Star Ratings and Staff Mentions
- Changelog Display with Navigation
- Custom Status Rotations
- Error Logging to Discord via Webhook
- Minecraft Server Website Display
- Player Reports Management

## Installation

- To run MxConsole on your own server, follow these steps:

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
 - Replace the placeholders with your actual Discord bot token, client ID, guild ID etc:
  
 ```sh
 TOKEN: 'DISCORD_BOT_TOKEN',                   // Replace with your bot token
 CLIENT_ID: 'PASTE_CLIENT_ID',                 // Replace with your client ID
 GUILD_ID: 'PASTE_GUILD_ID',                   // Replace with your guild ID
 ADMIN_ID: 'PASTE_ADMIN_ID',                   // Replace with your admin role ID
 MODERATOR_ID: 'PASTE_MOD_ID',                 // Replace with your moderator role ID
 DEV_ROLE_ID: 'PASTE_DEV_ID',                  // Replace with your developer role ID
 PLAYER_REPORT_LOG_CHANNEL: 'CHANNEL_ID',      // Replace with player report log channel ID
 PLAYER_REPORT_CHANNEL: 'CHANNEL_ID',          // Replace with player report channel ID
 BUG_REPORT_CHANNEL: 'CHANNEL_ID',             // Replace with bug report channel ID
 ERROR_WEBHOOK_URL: 'WEBHOOK_URL'              // Replace with your error webhook URL
  ```

  ### Step 4: Register Slash Commands

  - To register the bot's slash commands, use the following command:

  ```js
  node src/register-commands.js
  ```

  ### Step 5: Run the Bot:
   ```js
   node src/index.js
   ```

## Usage

### Starting the Bot

- To start the bot, use the following command:

```js
node src/index.js
```


> [!WARNING]
> 
> **Attention:** Reload the bot after adding, deleting, or updating slash commands to apply the latest configurations.

### Reloading Slash Commands

- To reload the bot's slash commands, use the following command:

```js
node src/register-commands.js
```

### Notes:
- **Sections**: Each section (`Error Logging`, `Contributing`, `License`, `Contact`) is briefly described and linked in the Table of Contents for easy navigation.
- **Commands**: Each command is briefly summarized with its functionality. You can expand on each command further as needed.
- **Customization**: Tailor the content to fit your specific bot's commands, features, and project details.
- **Images**: You can integrate images into specific command explanations by including markdown image syntax (`![Command Name](path_to_image.png)`) where appropriate.
  
This structure provides a clear and organized overview of your Discord bot project, making it easier for users to understand its features, installation process, usage instructions, and how they can contribute or get > support. Adjust and expand on each section based on your project's specific needs and audience.


<h6 align="center">©️ PROJECT | CN DEVELOPMENT UNIT</h6>

