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

## Commands

<details>
<summary><strong>/bug-report</strong>: Allows users to submit bug reports to the designated channel (#bug-reports).</summary>

````markdown
The bot listens for messages starting with /bug-report followed by the details of the bug. It logs these reports to the specified channel using a webhook for easy tracking and resolution by moderators.
````
<details>
<summary><strong>/changelogs</strong>: Retrieves and displays recent updates and changes made to the bot or server.</summary>

````markdown
It fetches this information from a predefined source (e.g., a text file or API endpoint) and formats it into a readable embed message for users to view.
````
<details>
<summary><strong>/ip</strong>: Fetches and displays the IP address of the Minecraft server associated with the bot.</summary>

````markdown
It retrieves this information either from a configuration file or directly from the server's status API, presenting it in a clear and accessible format to users.
````

<details>
<summary><strong>/help</strong>: Provides users with information about available commands and their functionalities.</summary>

````markdown
It responds to /help commands by sending a structured list of commands, along with brief descriptions of each, ensuring users understand how to interact with the bot effectively.
````

<details>
<summary><strong>/feedback</strong>: Enables users to submit feedback about the bot or server.</summary>

````markdown
It prompts users to provide their feedback, which can include text-based comments and optional star ratings. The bot then processes this feedback, logs it to a dedicated channel (#feedback), and notifies relevant staff members for review and response.
````

<details>
<summary><strong>/myid</strong>: Returns the Discord ID of the user who issued the command.</summary>

````markdown
It retrieves and displays the user's unique Discord identifier, facilitating user-specific actions or queries within the bot's functionality.
````

<details>
<summary><strong>/ping</strong>: Checks the latency (ping) of the bot to the Discord servers.</summary>

````markdown
It calculates and displays the time taken for the bot to receive and respond to a command, helping users assess the bot's responsiveness and connection quality.
````

<details>
<summary><strong>/player-report</strong>: Facilitates the management of player reports within the server.</summary>

````markdown
It allows moderators and administrators to view and handle reports submitted by users, including details such as the reported player's username, the reason for the report, and the number of times reported. Access to this command is restricted to authorized staff members (@admin and @moderator roles).
````

<details>
<summary><strong>/serverinfo</strong>: Provides detailed information about the Discord server where the bot is installed.</summary>

````markdown
It retrieves and displays server-specific details such as the server name, member count, creation date, and region, offering users insights into the server's configuration and demographics.
````

<details>
<summary><strong>/website</strong>: Displays the website URL associated with the Minecraft server.</summary>

````markdown
It retrieves and presents the server's website link, facilitating easy access for users to visit and explore additional information about the server, such as community resources, forums, or shop pages.
````

### Notes:
- **Sections**: Each section (`Error Logging`, `Contributing`, `License`, `Contact`) is briefly described and linked in the Table of Contents for easy navigation.
- **Commands**: Each command is briefly summarized with its functionality. You can expand on each command further as needed.
- **Customization**: Tailor the content to fit your specific bot's commands, features, and project details.
- **Images**: You can integrate images into specific command explanations by including markdown image syntax (`![Command Name](path_to_image.png)`) where appropriate.
  
This structure provides a clear and organized overview of your Discord bot project, making it easier for users to understand its features, installation process, usage instructions, and how they can contribute or get support. Adjust and expand on each section based on your project's specific needs and audience.


<h6 align="center">©️ PROJECT | CN DEVELOPMENT UNIT</h6>

