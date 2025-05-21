import ExamClient from "./ExamClient";
import fs from "fs";
import path from "path";

export default async function ExamPage({ params, searchParams }) {
  const { year, day } = params;
  const lang = searchParams.lang || "ingles";
  const timer = searchParams.timer || "true";

  const isFirstDay = day === "1";
  const firstDayOffset = isFirstDay ? 1 : 91;
  const secondDayOffset = isFirstDay ? 46 : 136;
  //limit cant be >50
  //https://docs.enem.dev/rate-limits
  const res_from_1_to_45 = await fetch(
    `https://api.enem.dev/v1/exams/${year}/questions?limit=44&offset=${firstDayOffset}&language=${lang}`,
    {
      cache: "force-cache",
    },
  );
  const res_from_45_to_90 = await fetch(
    `https://api.enem.dev/v1/exams/${year}/questions?limit=44&offset=${secondDayOffset}&language=${lang}`,
    {
      cache: "force-cache",
    },
  );

  const data1 = await res_from_1_to_45.json();
  const data2 = await res_from_45_to_90.json();

  const questions = data1.questions.concat(data2.questions);

  const filePath = path.join(process.cwd(), "questions-debug.json");
  fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), "utf-8");

  return (
    <ExamClient
      questions={questions}
      year={year}
      day={day}
      language={lang}
      useTimer={timer === "true"}
    />
  );
}
