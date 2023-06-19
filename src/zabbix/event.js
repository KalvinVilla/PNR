import zabbix_fetch from "../fetch/zabbix.js";
import { list_count, now, yesterday } from "../utils.js";

export const fetch_zabbix_event = async () => {
  return new Promise((resolve) => {
    zabbix_fetch("event.get", {
      time_from: yesterday,
      time_till: now,
      output: ["objectid", "name"],
      selectHosts: ["name"],
      sortfield: ["objectid"],
    }).then(({ result }) => {
      resolve(
        list_count(result, "objectid", 10).map(({ objectid, count }) => {
          const { name, hosts } = result.find((el) => {
            return el.objectid === objectid;
          });
          return {
            variable: `EVENT`,
            value: `<h2>${hosts[0].name}</h2><strong>${count} fois</strong><br />${name}`,
          };
        })
      );
    });
  });
};
