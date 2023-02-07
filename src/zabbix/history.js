import zabbix_fetch from "../fetch/zabbix.js";
import { list_top, now, yesterday } from "../utils.js";
import { fetch_zabbix_groups } from "./groups.js";
import { fetch_zabbix_item } from "./items.js";

export const fetch_zabbix_history = async (hostgroup_name, key, variable) => {
  return new Promise((resolve) => {
    fetch_zabbix_groups(hostgroup_name).then(({ hosts }) => {
      fetch_zabbix_item(
        key,
        hosts.map(({ hostid }) => {
          return hostid;
        })
      ).then((items) => {
        zabbix_fetch("history.get", {
          history: 0,
          time_from: yesterday,
          time_till: now,
          itemids: items.map((item) => {
            return item.itemid;
          }),
          output: "extend",
          sortfield: "clock",
          sortorder: "ASC",
        }).then(({ result }) => {
          resolve(
            list_top(result, "itemid", 5).map(({ itemid, value }) => {
              const hostid = items.find((el) => {
                return el.itemid === itemid;
              })?.hostid;
              const host = hosts.find((el) => {
                return el.hostid === hostid;
              })?.host;
              return {
                variable,
                value: `${host}
               <br /> ${value}`,
              };
            })
          );
        });
      });
    });
  });
};
