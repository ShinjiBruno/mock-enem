"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ExamYearsClient({ availableTests }) {
  const [isOptionsSelected, setIsOptionsSelected] = useState(false);
  const [examOptions, setExamOptions] = useState({
    year: null,
    day: null,
    language: "english",
    useTimer: true,
  });
  const [open, setOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const router = useRouter();

  const handleExamClick = (exam) => {
    setSelectedExam(exam);
    setOpen(true);
  };

  const handleDaySelect = (day) => {
    setExamOptions({ ...examOptions, day });
    setIsOptionsSelected(true);
  };

  const handleLanguageSelect = (language) => {
    setExamOptions({ ...examOptions, language });
  };

  const handleTimerToggle = (checked) => {
    setExamOptions({ ...examOptions, useTimer: checked });
  };

  const handleStartExam = () => {
    if (!examOptions.day) return;

    router.push(
      `/mock-exams/years/${selectedExam.year}/${examOptions.day}?lang=${examOptions.language}&timer=${examOptions.useTimer}`,
    );
  };

  return (
    <div className="container px-10 py-10">
      <h1 className="text-3xl font-bold mb-6">Simulados Disponíveis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableTests.map((exam, index) => (
          <Button
            onClick={() => handleExamClick(exam)}
            key={index}
            variant="outline"
            className="cursor-pointer h-auto p-4 text-left flex flex-col items-start"
          >
            <span className="text-xl font-medium">{exam.title}</span>
            <span className="text-sm text-muted-foreground">{exam.year}</span>
          </Button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurar Simulado</DialogTitle>
            <DialogDescription>
              Selecione as opções para o simulado {selectedExam?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="day">Dia da Prova</Label>
              <Select onValueChange={handleDaySelect}>
                <SelectTrigger id="day">
                  <SelectValue placeholder="Selecione o dia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">
                    1º Dia - Linguagens e Humanas
                  </SelectItem>
                  <SelectItem value="2">
                    2º Dia - Ciências da Natureza e Matemática
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {examOptions.day !== "2" && (
              <div className="grid gap-2">
                <Label htmlFor="language">Idioma</Label>
                <Select defaultValue="pt" onValueChange={handleLanguageSelect}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">Inglês</SelectItem>
                    <SelectItem value="spanish">Espanhol</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Switch
                id="timer"
                defaultChecked
                onCheckedChange={handleTimerToggle}
              />
              <Label htmlFor="timer">Usar cronômetro</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleStartExam}
              disabled={!isOptionsSelected}
              className="cursor-pointer"
            >
              Iniciar Prova
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
