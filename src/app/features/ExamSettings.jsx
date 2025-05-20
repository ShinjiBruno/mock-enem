import { Button } from "@/components/ui/button";

export default async function ExamSettings() {
  const res = await fetch("https://api.enem.dev/v1/exams", {
    cache: "force-cache",
  });
  const availableTests = await res.json();
  console.log("available Tests", availableTests);
  return (
    <div className="flex flex-col background-b min-h-screen">
      {availableTests.map((t, index) => {
        return (
          <Button key={index} className="mb-3 w-fit">
            {t.year}
          </Button>
        );
      })}
    </div>
  );
}
