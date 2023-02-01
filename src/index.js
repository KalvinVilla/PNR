import "dotenv/config";
import logger from "./logger.js";
import { get_receiver } from "./mail.js";
import { send_daily } from "./template/daily.js";

const log = logger(import.meta);

const { npm_package_name: name, npm_package_version: version } = process.env;

console.log("|------------------------------------------------------|");
console.log(
  `|                      ${name.toUpperCase()} ${version}                       |`
);
console.log("|                     zabbix : OK                      |");
console.log("|                     syslog : OK                      |");
console.log("|                     sflow : OK                       |");
console.log("|------------------------------------------------------|");

await send_daily().then(() => {
  log.info(get_receiver(), "sended mail");
});
