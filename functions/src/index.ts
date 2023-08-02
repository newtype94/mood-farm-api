import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

const axios = require("axios");

// dotenv 설정 load
require("dotenv").config();

export const helloWorld = onRequest(async (request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const getAdvice = onRequest(async (request, response) => {
  logger.info("get advice log..", { structuredData: true });

  console.log(request.query);
  const content: string = request.query.content as string;

  const messages = [
    {
      role: "system",
      content:
        "너는 고민거리가 있는 유저에게 도움되는 피드백과 위로를 해주는 역할이다. 상냥하고 활기찬 말투로 200자 이내의 답변을 준다.",
    },
    {
      role: "user",
      content,
    },
  ];
  const gptKey = process.env.GPT_KEY;

  const body = {
    model: "gpt-3.5-turbo",
    max_tokens: 300,
    temperature: 0.9,
    n: 1,
    messages: messages,
  };

  const headers = {
    Authorization: "Bearer " + gptKey,
    "Content-Type": "application/json",
  };

  const res = await axios.post({
    URL: "https://api.openai.com/v1/chat/completions",
    body,
    Headers: headers,
  });

  console.log(res);

  response.send("Get Advice Test");
});
