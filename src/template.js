import fs from "fs";

export const format_template = (template, payload, template_list) => {
  template_list.forEach((data) => {
    if (Array.isArray(data)) {
      data.forEach(({ variable, value , auto_key = true}, key) => {
        if(auto_key) {
          template = template.replace(`{${variable}_${key}}`, value);
        } else {
          template = template.replace(`{${variable}}`, value);
        }
      });
    } else {
      const { variable, value } = data;
      template = template.replace(`{${variable}}`, value);
    }
  });

  const regex = /\{(.*?)\}/g
  template = template.replaceAll(regex, "N/A")
  payload(template);
};

export const load_template = async (name) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./template/${name}.html`, "utf8", function (err, html) {
      if (err) reject(err);

      resolve(html);
    });
  });
};
