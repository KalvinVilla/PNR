import dayjs from "dayjs";
import { get_receiver, send_mail } from "../mail.js";
import { fetch_sflow_debit } from "../sflow/debit.js";
import { fetch_sflow_protocol } from "../sflow/protocol.js";
import { fetch_log_appname } from "../syslog/appname.js";
import { fetch_log_hostname } from "../syslog/hostname.js";
import { fetch_log } from "../syslog/log.js";
import { format_template, load_template } from "../template.js";
import { fetch_zabbix_history } from "../zabbix/history.js";
import { fetch_zabbix_problems } from "../zabbix/problems.js";
import fs from "fs";
import { now } from "../utils.js";
import { fetch_zabbix_event } from "../zabbix/event.js";

const date = {
  variable: "DATE",
  value: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
};

const title = {
  variable: "TITLE",
  value: "Rapport journalier du réseau ",
};
export const send_daily = async () => {
  const template = await load_template("daily");

  const log = await fetch_log();
  const debit = await fetch_sflow_debit();
  const appname = await fetch_log_appname();
  const hostname = await fetch_log_hostname();
  const protocol = await fetch_sflow_protocol();
  const count_problems = await fetch_zabbix_problems();
  const count_triggers = await fetch_zabbix_event();
  const server_cpu = await fetch_zabbix_history(
    "Server",
    "CPU utilization",
    "CPU_SERV"
  );
  const pc_ram = await fetch_zabbix_history(
    "PC",
    "Memory utilization",
    "RAM_PC"
  );
  const server_ram = await fetch_zabbix_history(
    "Server",
    "Memory utilization",
    "RAM_SERV"
  );
  const switch_cpu = await fetch_zabbix_history(
    "Switch",
    "CPU utilization",
    "CPU_SWITCH"
  );

  format_template(
    template,
    (template) => {
      fs.writeFileSync(`${now}.html`, template);
      send_mail(get_receiver(), template);
    },
    [
      date,
      title,
      count_problems,
      count_triggers,
      log,
      debit,
      appname,
      hostname,
      protocol,
      server_cpu,
      server_ram,
      switch_cpu,
      pc_ram,
    ]
  );
};
