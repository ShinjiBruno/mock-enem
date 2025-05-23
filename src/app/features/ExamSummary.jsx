"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function ExamSummary({
  questions,
  answers,
  onCurrentQuestion,
  onBack,
  onFinish,
  canFinish,
}) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-card rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Resumo do Exame</h2>

        <div className="mb-6">
          <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
            <div>
              <p className="font-medium">Questões respondidas</p>
              <p className="text-2xl font-bold">
                {answeredCount} de {totalQuestions}
              </p>
            </div>
            <div className="w-24 h-24 relative">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-muted-foreground stroke-current"
                  strokeWidth="10"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-primary stroke-current"
                  strokeWidth="10"
                  strokeDasharray={`${(answeredCount / totalQuestions) * 251.2} 251.2`}
                  strokeLinecap="round"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">
                  {Math.round((answeredCount / totalQuestions) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* {unansweredCount > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Você ainda tem {unansweredCount} questão(ões) não
                  respondida(s).
                </p>
              </div>
            </div>
          </div>
        )} */}

        <div className="space-y-6">
          <div className="p-2">
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {questions.map((question, index) => {
                const isAnswered = answers[question.index] !== undefined;

                return (
                  <div
                    onClick={() => {
                      onCurrentQuestion(index);
                      onBack();
                    }}
                    key={index}
                    className={`
                        cursor-pointer
                          aspect-square flex items-center justify-center rounded-md text-sm font-medium
                          ${
                            isAnswered
                              ? "bg-primary text-primary-foreground"
                              : "bg-destructive/20 text-destructive"
                          }
                        `}
                  >
                    {question.index}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Voltar ao Exame
          </Button>

          <Button
            onClick={() => setShowConfirmDialog(true)}
            disabled={!canFinish}
          >
            {canFinish ? "Finalizar Exame" : "Responda Todas as Questões"}
          </Button>
        </div>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Finalizar exame?</AlertDialogTitle>
            <AlertDialogDescription>
              Depois de finalizar, você não poderá fazer alterações. Tem certeza
              de que deseja finalizar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={onFinish}>Finalizar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
