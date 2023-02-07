import dayjs from "dayjs";

export const now = dayjs(Date.now()).unix();
export const yesterday = dayjs(Date.now()).day(0).unix();

export const convert_bytes_to_giga = (octet) => {
  return Math.round(octet / 1000000000);
};

export const list_top = (list, key, top) => {
  const list_object = {};

  for (const obj of list) {
    const key_value = obj[key];
    if (!list_object[key_value]) {
      list_object[key_value] = {
        [key]: key_value,
        value: 0,
        count: 0,
      };
    }
    list_object[key_value].value += parseFloat(obj.value);
    list_object[key_value].count++;
  }

  const list_agv = Object.values(list_object).map((obj) => {
    obj.value /= obj.count;
    return obj;
  });

  list_agv.sort((a, b) => b.value - a.value);

  return list_agv.slice(0, top);
};

export const list_count = (list, key, top) => {
  const list_object = {};

  for (const obj of list) {
    const key_value = obj[key];
    if (!list_object[key_value]) {
      list_object[key_value] = {
        [key]: key_value,
        count: 0,
      };
    }
    list_object[key_value].count++;
  }

  return Object.values(list_object)
    .sort((a, b) => (b.count < a.count ? -1 : 1))
    .slice(0, top);
};
