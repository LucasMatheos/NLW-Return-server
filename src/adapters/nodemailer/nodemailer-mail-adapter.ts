import  nodemailer  from 'nodemailer';
import { MailAdapter, SendMailData } from "./../mail-adapter";


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0968c45b6c848a",
    pass: "8b3e6854207a87",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Lucas Brito <lucasm_brito@hotmail.com>",
      subject,
      html: body,
    });
  }
}
