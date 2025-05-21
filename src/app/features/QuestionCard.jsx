"use client";

import { useState } from "react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

function formatMarkdownText(text) {
  if (!text) return "";

  let formattedText = text.replace(/!\[[^\]]*\]\([^)]+\)/g, "");

  formattedText = formattedText.replace(
    /(\*\*|__)(.*?)\1/g,
    "<strong>$2</strong>",
  );

  formattedText = formattedText.replace(/(\*|_)(.*?)\1/g, "<em>$2</em>");

  formattedText = formattedText.replace(/\n{2,}/g, "<br/><br/>");

  return formattedText;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  note,
  onSelectAnswer,
  onSaveNote,
  questionNumber,
  totalQuestions,
}) {
  const [currentNote, setCurrentNote] = useState(note);

  const handleNoteChange = (e) => {
    const text = e.target.value;
    if (text.length <= 300) {
      setCurrentNote(text);
    }
  };

  const handleNoteBlur = () => {
    onSaveNote(currentNote);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{question.title}</h2>
        <span className="text-sm text-muted-foreground">
          {questionNumber} de {totalQuestions}
        </span>
      </div>

      <div
        className="prose dark:prose-invert max-w-none mb-6"
        dangerouslySetInnerHTML={{
          __html: formatMarkdownText(question.context),
        }}
      />

      {question.files && question.files.length > 0 && (
        <div className="mb-6">
          {question.files.map((file, index) => (
            <div key={index} className="relative w-full max-w-lg mx-auto h-64">
              <Image
                src={file}
                alt={`Question Image ${question.index}`}
                fill
                className="object-contain size-auto "
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <p className="font-medium mb-4">{question.alternativesIntroduction}</p>

        <div className="space-y-3">
          {question.alternatives.map((alternative) => (
            <div
              key={alternative.letter}
              className={`flex items-start p-3 rounded-md cursor-pointer border ${
                selectedAnswer === alternative.letter
                  ? "border-primary bg-primary/10"
                  : "border-border hover:bg-muted/50"
              }`}
              onClick={() => onSelectAnswer(alternative.letter)}
            >
              <div className="mr-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                    selectedAnswer === alternative.letter
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border"
                  }`}
                >
                  {alternative.letter}
                </div>
              </div>

              <div className="flex-1">
                <p>{alternative.text}</p>

                {alternative.file && (
                  <div className="mt-2 relative w-full max-w-sm h-40">
                    <Image
                      src={alternative.file}
                      alt={`Imagem da alternativa ${alternative.letter}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Anotações</h3>
          <span className="text-xs text-muted-foreground">
            {currentNote.length}/300 caracteres
          </span>
        </div>
        <Textarea
          value={currentNote}
          onChange={handleNoteChange}
          onBlur={handleNoteBlur}
          placeholder="Faça suas anotações aqui (máx. 300 caracteres)"
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
}
