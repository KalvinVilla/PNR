import fetch from "node-fetch";

const { zabbix_server, zabbix_token } = process.env;

const zabbix_fetch = async (method, params) => {
  return await fetch(zabbix_server, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      auth: zabbix_token,
      method,
      params,
    }),
  }).then(async (response) => {
    return await response.json();
  });
};

export default zabbix_fetch;
