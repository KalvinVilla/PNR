import { now, yesterday } from "../utils.js";
import zabbix_fetch from "../fetch/zabbix.js";

const problems_severity = {
  avertissement: "2",
  moyen: "3",
  haut: "4",
  desastre: "5",
};

export const fetch_zabbix_problems = async () => {
  return new Promise((resolve) => {
    zabbix_fetch("problem.get", {
      time_from: yesterday,
      time_till: now,
      output: ["severity"],
      recent:	false,
      sortfield: [
        "eventid"
      ]
    }).then(({ result }) => {
      resolve(
        Object.values(problems_severity).map((el) => {
          const count = result.reduce(
            (acc, cur) => (cur.severity === el ? ++acc : acc),
            0
          );
          return {
            variable: `PROBLEM_${el}`,
            value: count,
            auto_key: false,
          };
        })
      );
    });
  });
};
