import zabbix_fetch from "../fetch/zabbix.js";

export const fetch_zabbix_item = async (name, hostids) => {
  return new Promise((resolve) => {
    zabbix_fetch("item.get", {
      output: ["hostid"],
      search: {
        name,
      },
      hostids,
    }).then(({ result }) => {
      resolve(result);
    });
  });
};
