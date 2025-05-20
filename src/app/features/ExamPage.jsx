import ExamClient from "./ExamClient";

export default async function ExamPage({ params, searchParams }) {
  const { year, day } = params;
  const { lang = "english", timer = "true" } = searchParams;
  const isFirstDay = day === "1";
  const firstOffset = isFirstDay ? 0 : 90;
  const secondOffset = isFirstDay ? 45 : 135;
  //limit cant be >50
  //https://docs.enem.dev/rate-limits
  const res_from_1_to_45 = await fetch(
    `https://api.enem.dev/v1/exams/${year}/questions?limit=45&offset=${firstOffset}`,
    {
      cache: "force-cache",
    },
  );
  const res_from_45_to_90 = await fetch(
    `https://api.enem.dev/v1/exams/${year}/questions?limit=45&offset=${secondOffset}`,
    {
      cache: "force-cache",
    },
  );

  const data = await res_from_1_to_45.json();
  const data2 = await res_from_45_to_90.json();

  const questions = data.questions.concat(data2.questions);
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
