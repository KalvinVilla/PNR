import fs from "fs";
import dateFormat from "dateformat";

const format_template = (template) => {
  return template.replace("{date}", dateFormat(new Date(), "dd mmmm"));
};

export const load_template = async (name) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./template/${name}.html`, "utf8", function (err, html) {
      if (err) reject(err);

      resolve(format_template(html));
    });
  });
};
