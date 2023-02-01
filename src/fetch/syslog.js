import { InfluxDB } from "@influxdata/influxdb-client";

const { syslog_server, syslog_timeout, syslog_token, syslog_org } = process.env;

const queryApi = new InfluxDB({
  url: syslog_server,
  token: syslog_token,
  transportOptions: { rejectUnauthorized: false },
  timeout: parseInt(syslog_timeout) * 1000,
}).getQueryApi(syslog_org);

export const syslog_query = async (query) => {
  return new Promise((resolve, reject) => {
    const data = [];
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        data.push(o);
      },
      error(error) {
        reject(error);
      },
      complete() {
        resolve(data);
      },
    });
  });
};
