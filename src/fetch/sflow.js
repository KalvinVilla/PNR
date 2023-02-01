import { InfluxDB } from "@influxdata/influxdb-client";

const { sflow_server, sflow_timeout, sflow_token, sflow_org } = process.env;

const queryApi = new InfluxDB({
  url: sflow_server,
  token: sflow_token,
  transportOptions: { rejectUnauthorized: false },
  timeout: parseInt(sflow_timeout) * 1000,
}).getQueryApi(sflow_org);

export const sflow_query = async (query) => {
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
