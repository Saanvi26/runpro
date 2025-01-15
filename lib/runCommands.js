import fs from "fs";
import { exec } from "child_process";
import chalk from "chalk";
import path from "path";

function executeScript(script) {
  return new Promise((resolve, reject) => {
    exec(script, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function runCommands(configPath) {
  if (!fs.existsSync(configPath)) {
    console.error(chalk.red(`Config file not found at: ${configPath}`));
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const entries = Object.entries(config);
  const cwd = process.cwd();

  for (const [key, { path: relativePath, command }] of entries) {
    // Combine the CWD with the relative path from the config
    const fullPath = path.resolve(cwd, relativePath);

    console.log(chalk.blue(`Starting ${key} in a new Terminal tab...`));
    const fullCommand = `cd "${fullPath}" && ${command}`;

    const script = `
      osascript -e '
      tell application "Terminal"
        if not (exists window 1) then
          do script "${fullCommand.replace(/"/g, '\\"')}"
        else
          tell application "System Events"
            tell process "Terminal"
              key code 17 using {command down} -- Cmd+T to open a new tab
            end tell
          end tell
          delay 0.5 -- Wait for the new tab to be ready
          do script "${fullCommand.replace(
            /"/g,
            '\\"'
          )}" in selected tab of front window
        end if
        activate
      end tell'`;

    try {
      await executeScript(script); // Wait for each script to complete
      console.log(chalk.green(`Successfully started ${key}.`));
    } catch (err) {
      console.error(chalk.red(`Failed to start ${key}: ${err.message}`));
    }
  }
}

export default runCommands;
