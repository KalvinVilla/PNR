import dayjs from "dayjs";
import { get_receiver, send_mail } from "../mail.js";
import { fetch_sflow_debit } from "../sflow/debit.js";
import { fetch_sflow_protocol } from "../sflow/protocol.js";
import { fetch_log_appname } from "../syslog/appname.js";
import { fetch_log_hostname } from "../syslog/hostname.js";
import { fetch_log } from "../syslog/log.js";
import { format_template, load_template } from "../template.js";

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

  const count_problems = [];
  const log = await fetch_log();
  const debit = await fetch_sflow_debit()
  const appname = await fetch_log_appname();
  const hostname = await fetch_log_hostname();
  const protocol = await fetch_sflow_protocol();
  const server_top_cpu = [];

  format_template(
    template,
    (template) => {
      send_mail(get_receiver(), template);
    },
    [
      date,
      title,
      count_problems,
      log,
      debit,
      appname,
      hostname,
      protocol,
      server_top_cpu,
    ]
  );
};
