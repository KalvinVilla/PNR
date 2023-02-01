import { now, yesterday } from "../utils.js";
import { syslog_query } from "../fetch/syslog.js";

const { syslog_bucket } = process.env;

export const fetch_log_appname = async () => {
  return new Promise((resolve) => {
    syslog_query(`from(bucket: "${syslog_bucket}")
    |> range(start: ${yesterday}, stop: ${now})
    |> filter(fn: (r) =>  r["appname"] != "tFwLog")
    |> filter(fn: (r) => r["_measurement"] == "syslog")
    |> filter(fn: (r) => r["_field"] == "message")
    |> group(columns: ["appname"])
    |> count()
    |> group()
    |> top(columns: ["_value"], n: 6)
    |> keep(columns: ["_value", "appname"])`).then((data) => {
      resolve(
        data.map(({ _value, appname }) => {
          return {
            variable: "APPNAME",
            value: `${appname} <br /> ${_value}`,
          };
        })
      );
    });
  });
};
