import zabbix_fetch from "../fetch/zabbix.js";

export const fetch_zabbix_item = async (key_, hostids) => {
  return new Promise((resolve) => {
    zabbix_fetch("item.get", {
      output: ["hostid"],
      search: {
        key_,
      },
      hostids,
    }).then(({ result }) => {
      resolve(result);
    });
  });
};
