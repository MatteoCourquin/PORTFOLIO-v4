import { client } from '@/sanity/lib/client';

export const fetchQuestions = async () => {
  const query = `
    *[_type == "questions"] {
      questionEn,
      questionFr,
      answerEn,
      answerFr,
    }`;

  const questions = await client.fetch(query);

  return questions;
};
