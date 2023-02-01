import zabbix_fetch from "../fetch/zabbix.js";

export const fetch_zabbix_groups = async (name) => {
  return new Promise((resolve) => {
    zabbix_fetch("hostgroup.get", {
      selectHosts: ["host"],
      output: ["name", "groupdid"],
      real_hosts: true,
      sortfield: "name",
      filter: {
        name,
      },
    }).then(({ result }) => {
      resolve(result[0]);
    });
  });
};
