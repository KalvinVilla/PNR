import { now, yesterday } from "../utils.js";
import { syslog_query } from "../fetch/syslog.js";

const { syslog_bucket } = process.env;

export const fetch_log_hostname = async () => {
  return new Promise((resolve) => {
    syslog_query(`from(bucket: "${syslog_bucket}")
    |> range(start: ${yesterday}, stop: ${now})
    |> filter(fn: (r) => r["_measurement"] == "syslog")
    |> filter(fn: (r) =>  r["appname"] != "tFwLog")
    |> filter(fn: (r) => r["_field"] == "message")
    |> group(columns: ["hostname"])
    |> count()
    |> group()
    |> keep(columns: ["_value", "hostname"])`).then((data) => {
      resolve(
        data.map(({ _value, hostname }) => {
          return {
            variable: "HOSTNAME",
            value: `${hostname} <br /> ${_value}`,
          };
        })
      );
    });
  });
};
