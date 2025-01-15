#!/usr/bin/env node

import path from "path";
import runCommands from "../lib/runCommands.js";
import chalk from "chalk";

// const chalk = require("chalk");

function showHelp() {
  console.log(`
Usage:
  run-project <command> <config-path>

Commands:
  start    Run the commands defined in the config file.
  help     Show this help message.

Example:
  run-project start ./config/example.config.json
`);
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error(chalk.red("Invalid arguments."));
  showHelp();
  process.exit(1);
}

const [command, configPath] = args;

if (command === "help") {
  showHelp();
} else if (command === "start") {
  const baseDir = process.cwd();
  const absoluteConfigPath = path.resolve(baseDir, configPath);
  runCommands(absoluteConfigPath);
} else {
  console.error(chalk.red(`Unknown command: ${command}`));
  showHelp();
  process.exit(1);
}
