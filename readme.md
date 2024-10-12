# Discord Bot for Upcoming Hackathons

This Discord bot scrapes data from **Unstop** and **Devfolio** to provide real-time information about upcoming hackathons. The bot delivers the scraped information directly to a designated Discord channel, making it easier for users to stay updated on hackathon events.

## Features

- **Scraping Data from Unstop and Devfolio**: Fetches real-time information about upcoming hackathons.
- **Discord Integration**: Sends the collected hackathon data to a specified Discord channel.
- **Automated Updates**: Periodically checks for new hackathons and posts updates without manual intervention.
- **Customizable Commands**: Allows users to interact with the bot to query specific hackathons, filter by dates, or receive notifications for certain types of events.

## Getting Started

### Prerequisites

- **Node.js** (v14+ recommended)
- npm or yarn (for package management)
- Discord Developer Account: To create a bot and get your bot token.
- API access to Unstop and Devfolio (if available).

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/AayushNandan623/HackBot.git
    cd HackBot
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Set up your `.env` file to include the following environment variables:
    ```
    TOKEN=your-discord-bot-token
    ```

### Usage

1. Run the bot:
    ```bash
    npm start
    ```

2. Invite the bot to your Discord server:
   - Go to the Discord Developer Portal, and under the OAuth2 section, generate an OAuth URL with `bot` permissions.
   - Use the URL to add the bot to your server.

3. The bot will automatically begin scraping hackathon data and posting it to the specified Discord channel.



## Tech Stack

- **Node.js**: Runtime environment for JavaScript.
- **Discord.js**: Library for interacting with the Discord API.
- **puppeteer.js**: Fast and flexible library for web scraping.

## Contribution

Feel free to open issues and pull requests if you want to contribute to this project. Suggestions and improvements are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

This file provides the necessary details for others to understand and use your project on GitHub. Let me know if you'd like to make any changes!
