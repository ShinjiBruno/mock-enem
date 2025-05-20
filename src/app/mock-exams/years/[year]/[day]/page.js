import ExamPage from "@/app/features/ExamPage";

export default async function Page({ params, searchParams }) {
  return <ExamPage params={params} searchParams={searchParams}></ExamPage>;
}
