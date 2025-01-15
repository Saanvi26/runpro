# Runpro

RunPro is a command-line tool that helps you run multiple terminal commands in separate tabs, based on configurations defined in a `config.json` file. It is designed to simplify the management of multiple services (e.g., frontend and backend) running concurrently in different directories.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Saanvi26/runpro.git
   cd runpro
2. Install the required dependencies:
   ```bash
   npm install

## Configuration

In the root folder of the project, create a config.json file. This file should define the commands to run in each terminal tab.

## Usage

### Start the Commands
Run the following command to start the commands defined in the `config.json` file. This will open a new terminal tab for each command and run the respective command from the specified directory.

   runpro start <path-to-config.json>
### Help Command
   runpro help
   
## How It Works

**Config File**: The `config.json` defines which commands to run and their associated directories.  
**Execution**: The `runpro` tool reads the configuration file, navigates to each specified directory, and opens a new terminal tab for each command.  
**Platform**: The tool uses `osascript` for macOS to control Terminal and create new tabs. (Currently, it works on macOS only.)

### Requirements
- macOS (due to the use of `osascript` for controlling the Terminal).
- Node.js installed.

### Contributing
Contributions are welcome! Here's how you can contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature-branch`).
5. Open a pull request.

### License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

### Acknowledgements
- The `chalk` package is used for styling the terminal output.
- The `osascript` is used for controlling Terminal and managing tabs in macOS.


