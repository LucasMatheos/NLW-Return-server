import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0968c45b6c848a",
    pass: "8b3e6854207a87",
  },
});

app.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });
  transport.sendMail({
    from: "Equipe Feedget <oi@feedget.com>",
    to: "Lucas Brito <lucasm_brito@hotmail.com>",
    subject: "Novo feedback",
    html:`
    
    `
  });

  return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
  console.log("HTTP server running");
});
