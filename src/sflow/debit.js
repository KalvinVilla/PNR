import { now, yesterday } from "../utils.js";
import { sflow_query } from "../fetch/sflow.js";
import { convert_bytes_to_giga } from "../utils.js";

const { sflow_bucket } = process.env;

export const fetch_sflow_debit = async () => {
  return new Promise((resolve) => {
    sflow_query(`from(bucket: "${sflow_bucket}")
    |> range(start: ${yesterday}, stop: ${now})
    |> filter(fn: (r) => r["_measurement"] == "sflow")
    |> filter(fn: (r) => r["_field"] == "bytes")
    |> group(columns: ["agent_address"])
    |> sum()
    |> group()
    |> keep(columns: ["_value", "agent_address"])`).then((data) => {
      resolve(
        data.map(({ _value, agent_address }) => {
          return {
            variable: "ROUTER_DEBIT",
            value: `${agent_address} <br /> ${convert_bytes_to_giga(
              _value
            )} Go`,
          };
        })
      );
    });
  });
};
