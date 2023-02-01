import dayjs from "dayjs";

export const now = dayjs(Date.now()).unix();
export const yesterday = dayjs(Date.now()).day(0).unix();

export const convert_bytes_to_giga = (octet) => {
  return Math.round(octet / 1000000000);
};

export const zabbix_items_top = (items, top) => {
  const items_object = {};
  for (const obj of items) {
    if (!items_object[obj.itemid]) {
      items_object[obj.itemid] = {
        itemid: obj.itemid,
        value: 0,
        count: 0,
      };
    }
    items_object[obj.itemid].value += parseFloat(obj.value);
    items_object[obj.itemid].count++;
  }

  const items_agv = Object.values(items_object).map((obj) => {
    obj.value /= obj.count;
    return obj;
  });

  items_agv.sort((a, b) => b.value - a.value);

  return items_agv.slice(0, top);
};
