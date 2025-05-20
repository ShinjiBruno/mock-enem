"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ExamTimer({ duration, onTimeEnd }) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timer;
    if (isRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onTimeEnd && onTimeEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeRemaining, onTimeEnd]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-2xl font-bold">
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </div>
      <Button
        onClick={toggleTimer}
        variant="outline"
        size="sm"
        className="w-full"
      >
        {isRunning ? "Pausar" : "Continuar"}
      </Button>
    </div>
  );
}
