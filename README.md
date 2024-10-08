
<h2 align="center">
    MxConsole v1.20.4
</h2>

<p align="center">
    <img src="MxConsole2.png" alt="MxConsole Logo" width="200"/>
</p>

MxConsole is a versatile Discord bot designed to enhance your Minecraft server with advanced features, professional commands, and custom functionalities.

## Table of Contents

- [Overview](#overview)🌟
- [Features](#features)🚀
- [Installation](#⚙installation)⚙️
- [Usage](#usage)📖
- [Commands](#commands)📋
- [Error Logging](#error-logging)🛠️
- [License](#license)📜
- [Contact](#contact)📧

## 🌟 Overview

MxConsole simplifies server management and enhances player interaction on your SriCraft Minecraft server. It offers a range of powerful features designed to streamline administrative tasks and improve community engagement.

## 🚀 Features

> These are the features that makes you wanna use our bot. Check it out!
>

- **Interactive Commands:** Manage your server efficiently with intuitive slash commands.
- **Dynamic Status Updates:** Keep players informed with customizable status rotations.
- **Error Logging:** Monitor bot health with integrated error logging via Discord webhooks.
- **Feedback System:** Collect player feedback effortlessly, complete with star ratings and staff mentions.
- **Changelog Navigation:** Stay updated with streamlined access to server updates and changes.

## ⚙️ Installation

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

- Open the `.env.example` file in the root directory & Rename to `.env`.
- Update with your Discord bot token and server specifics.

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

## 📖 Usage

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

## 📋 Commands

<details>
<summary>/botinfo</summary>
Displays information about the bot.
</details>
<details>
<summary>/bug-report</summary>
Allows users to report bugs or issues related to the Minecraft server.
</details>
<details>
<summary>/changelogs</summary>
Displays recent changes, updates, or version history of the Minecraft server or bot.
</details>
<details>
<summary>/feedback</summary>
Enables users to submit feedback or suggestions regarding the Minecraft server.
</details>
<details>
<summary>/help</summary>
Provides a list of available commands and their usage instructions.
</details>
<details>
<summary>/ip</summary>
Shows the IP address or connection details of the Minecraft server.
</details>
<details>
<summary>/myid</summary>
Displays the user's Discord ID for identification purposes.
</details>
<details>
<summary>/ping</summary>
Checks the bot's latency and responsiveness.
</details>
<details>
<summary>/player-report</summary>
Allows players to report other players for violations or issues within the Minecraft server.
</details>
<details>
<summary>/purge</summary>
Deletes a specified number of messages from a channel.
</details>
<details>
<summary>/serverinfo</summary>
Provides detailed information about the Minecraft server, such as current status, player count, etc.
</details>
<details>
<summary>/website</summary>
Displays the URL or link to the Minecraft server's official website or related resources.
</details>

## 🛠️ Error Logging
- MxConsole ensures robust performance with comprehensive error logging. Errors are instantly relayed to your designated Discord channel via webhook integration. onfigure the webhook URL in the `.env` file.

## 📜 License

> [!NOTE] 
> MxConsole by [lordskidgod](https://github.com/lordskidgod/) is licensed under the MIT License. See [MIT License](LICENSE) for details.

**TL;DR**

- BY: Credit must be given to me, the creator. (lordskidgod)
- NC: Only noncommercial use of your work is permitted.
- SA: Adaptations must be shared under the same terms.

![License](https://img.shields.io/github/license/lordskidgod/MxConsole)



For more details, please see the [LICENSE](LICENSE) file included with the source code.

## 📧 Contact

For support, questions, or any inquiries, feel free to contact us, reach out through:

- **Email:** [support@sricraftmc.net](mailto:support@sricraftmc.net)
- **Discord:** Join our [Discord server](https://discord.gg/T866cmAKBJ) for live assistance and updates.

We value your feedback and are here to help you make the most out of MxConsole.

### Notes:
> [!NOTE]
> - **Sections**: Each section (`Error Logging`, `Contributing`, `License`, `Contact`) is briefly described and linked in the Table of Contents for easy navigation.
> - **Commands**: Each command is briefly summarized with its functionality. You can expand on each command further as needed.
> - **Customization**: Tailor the content to fit your specific bot's commands, features, and project details.
> - **Images**: You can integrate images into specific command explanations by including markdown image syntax (`![Command Name](path_to_image.png)`) where appropriate.
  
This structure provides a clear and organized overview of your Discord bot project, making it easier for users to understand its features, installation process, usage instructions, and how they can contribute or get > support. Adjust and expand on each section based on your project's specific needs and audience.

<h6 align="center">©️ PROJECT | CN DEVELOPMENT UNIT</h6>

<p align="center">© 2024 Ceylon Network Inc. Developed with ❤️ by lordskidgod.</p>
