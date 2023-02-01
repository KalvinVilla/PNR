import { now, yesterday } from "../utils.js";
import { sflow_query } from "../fetch/sflow.js";
import { convert_bytes_to_giga } from "../utils.js";

import port from "../../ports.json" assert { type: "json" };

const { sflow_bucket } = process.env;

export const fetch_sflow_protocol = async () => {
  return new Promise((resolve) => {
    sflow_query(`from(bucket: "${sflow_bucket}")
    |> range(start: ${yesterday}, stop: ${now})
    |> filter(fn: (r) => r["_field"] == "bytes")
    |> group(columns: ["dst_port"])
    |> sum(column: "_value")
    |> group()
    |> top(columns: ["_value"], n: 6)
    |> keep(columns: ["_value", "dst_port"])`).then((data) => {
      resolve(
        data.map(({ _value, dst_port }) => {
          return {
            variable: "PROTOCOL",
            value: `${
              port[dst_port]?.name ?? dst_port
            } <br /> ${convert_bytes_to_giga(_value)} Go`,
          };
        })
      );
    });
  });
};
