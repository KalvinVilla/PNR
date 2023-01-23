import nodemailer from "nodemailer";

import logger from "./logger.js";

const log = logger(import.meta);

const {
  smtp_server,
  smtp_port,
  smtp_user,
  smtp_subject,
  smtp_password,
  smtp_sender,
  smtp_receiver,
} = process.env;

const transporter = nodemailer.createTransport({
  host: smtp_server,
  port: smtp_port,
  secure: false,
  auth: {
    user: smtp_user,
    pass: smtp_password,
  },
  tls: { rejectUnauthorized: false },
});

export const send_mail = async (to, html) => {
  const options = {
    from: smtp_sender,
    to,
    subject: smtp_subject,
    html,
  };

  const info = await transporter.sendMail(options);
  log.info(info.messageId);
};

export const get_receiver = () => {
  if (smtp_receiver.includes(",")) {
    const list = smtp_receiver.split(",");
    return list;
  } else {
    return smtp_receiver;
  }
};
