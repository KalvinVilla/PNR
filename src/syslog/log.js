import { now, yesterday } from "../utils.js";
import { syslog_query } from "../fetch/syslog.js";

const { syslog_bucket } = process.env;

export const fetch_log = async () => {
  return new Promise((resolve) => {
    syslog_query(`from(bucket: "${syslog_bucket}")
    |> range(start: ${yesterday}, stop: ${now})
    |> filter(fn: (r) => r["_measurement"] == "syslog")
    |> filter(fn: (r) =>  r["appname"] != "tFwLog")
    |> filter(fn: (r) => r["_field"] == "message")
    |> group(columns: ["severity"])
    |> count()
    |> group()
    |> keep(columns: ["_value", "severity"])`).then((data) => {
      resolve(
        data.map(({ _value, severity }) => {
          return {
            variable: `LOG_${severity_index[severity]}`,
            value: _value,
            auto_key: false,
          };
        })
      );
    });
  });
};

const severity_index = {
  info: 0,
  notice: 1,
  debug: 2,
  warning: 3,
  err: 4,
  crit: 5,
};
