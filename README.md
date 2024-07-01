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
> [!NOTE]
> **Never commit or share your bot token publicly.** Keep them secure to prevent unauthorized access to your bot.

- Open the `.env` file in the root directory.
- Replace the placeholders with your actual Discord bot token, client ID, guild ID, etc.:

```env
TOKEN=DISCORD_BOT_TOKEN                   # Replace with your bot token
CLIENT_ID=PASTE_CLIENT_ID                 # Replace with your client ID
GUILD_ID=PASTE_GUILD_ID                   # Replace with your guild ID
ADMIN_ID=PASTE_ADMIN_ID                   # Replace with your admin role ID
MODERATOR_ID=PASTE_MOD_ID                 # Replace with your moderator role ID
DEV_ROLE_ID=PASTE_DEV_ID                  # Replace with your developer role ID
PLAYER_REPORT_LOG_CHANNEL=CHANNEL_ID      # Replace with player report log channel ID
PLAYER_REPORT_CHANNEL=CHANNEL_ID          # Replace with player report channel ID
BUG_REPORT_CHANNEL=CHANNEL_ID             # Replace with bug report channel ID
ERROR_WEBHOOK_URL=WEBHOOK_URL             # Replace with your error webhook URL
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

## Error Logging
- The bot includes an error logging system that sends error messages to a specified Discord channel via a webhook. Configure the webhook URL in the `.env` file.

## License

> [!NOTE]: as of version 1.20.4, MxConsole is licensed under MIT License.

MxConsole by [lordskidgod](https://github.com/lordskidgod/) is licensed under [MIT License](LICENSE).

TL;DR

- **Permission**: Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.
- **Conditions**: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
- **Disclaimer**: The Software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the Software or the use or other dealings in the Software.

![License](https://img.shields.io/github/license/lordskidgod/MxConsole)



For more details, please see the [LICENSE](LICENSE) file included with the source code.

## Contact

For support, questions, or any inquiries, feel free to contact us through the following channels:

- **Email:** [support@sricraftmc.net](mailto:support@sricraftmc.net)
- **Discord:** Join our [Discord server](https://discord.gg/sricraft) for real-time support and community discussions.

We value your feedback and are here to help you make the most out of MxConsole.

### Notes:
- **Sections**: Each section (`Error Logging`, `Contributing`, `License`, `Contact`) is briefly described and linked in the Table of Contents for easy navigation.
- **Commands**: Each command is briefly summarized with its functionality. You can expand on each command further as needed.
- **Customization**: Tailor the content to fit your specific bot's commands, features, and project details.
- **Images**: You can integrate images into specific command explanations by including markdown image syntax (`![Command Name](path_to_image.png)`) where appropriate.
  
This structure provides a clear and organized overview of your Discord bot project, making it easier for users to understand its features, installation process, usage instructions, and how they can contribute or get > support. Adjust and expand on each section based on your project's specific needs and audience.


<h6 align="center">©️ PROJECT | CN DEVELOPMENT UNIT</h6>

