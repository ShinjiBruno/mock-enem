"use client";
import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import QuestionNav from "./QuestionNav";
import SimpleHeader from "./Header";

export default function ExamReviewPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  useEffect(() => {
    setQuestions(
      JSON.parse(localStorage.getItem("examReviewQuestions") || "[]"),
    );
    setAnswers(JSON.parse(localStorage.getItem("examReviewAnswers") || "{}"));

    console.log("questions", questions);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SimpleHeader />
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4 bg-card rounded-lg p-4 shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4">Navegação</h2>
          <QuestionNav
            questions={questions}
            answers={answers}
            currentIndex={currentQuestionIndex}
            onSelectQuestion={setCurrentQuestionIndex}
            showCorrection={true}
          />
        </div>
        <div className="lg:w-3/4">
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={answers[currentQuestion.index]}
              note={""}
              onSelectAnswer={() => {}}
              onSaveNote={() => {}}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              showCorrection={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
