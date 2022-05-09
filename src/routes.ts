import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";
import express from "express";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { prisma } from "./prisma";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRespository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRespository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({ type, comment, screenshot });

  return res.status(201).send();
});

routes.get("/feedbacks", async (req, res) => {
  const feedbacks = await prisma.feedback.findMany({
    select: {
      type: true,
      comment: true,
      screenshot: true,
    },
  });
  
  return res.status(201).json(feedbacks);
});
