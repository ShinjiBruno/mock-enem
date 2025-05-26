"use client";

import { useRouter } from "next/navigation";

export default function ExamScore({ score, questions }) {
  const route = useRouter();
  const scoreInt = parseInt(score, 10);
  const questionsInt = parseInt(questions, 10);

  const percentage =
    !isNaN(scoreInt) && !isNaN(questionsInt) && questionsInt > 0
      ? Math.round((scoreInt / questionsInt) * 100)
      : 0;

  return (
    <div>
      <main className="flex flex-1 flex-col items-center justify-center px-4">
        {score ? (
          <div className="bg-card rounded-xl shadow-lg p-8 flex flex-col items-center gap-6 max-w-md w-full border">
            <h1 className="text-3xl font-bold text-primary mb-2">Parabéns!</h1>
            <p className="text-lg text-muted-foreground mb-4">
              Você concluiu o simulado.
            </p>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl font-medium">Você acertou:</span>
              <span className="text-5xl font-extrabold text-green-600">
                {score}/{questions}
              </span>
              <span className="text-base text-muted-foreground">
                ({percentage}% de acertos)
              </span>
            </div>
            <button
              className="mt-4 underline text-primary cursor-pointer"
              onClick={() => route.push("/mock-exams/review")}
            >
              Revisar acertos e erros
            </button>
            <div className="w-full flex justify-center mt-6">
              <a
                href="/mock-exams/years"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:bg-primary/90 transition"
              >
                Tentar outro simulado
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-6 text-destructive text-center max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">
              Ocorreu um erro inesperado.
            </h2>
            <p>Não foi possível calcular sua pontuação.</p>
            <div className="mt-4">
              <a href="/mock-exams/years" className="underline text-primary">
                Voltar para simulados
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
