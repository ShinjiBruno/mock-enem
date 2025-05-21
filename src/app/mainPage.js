"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SimpleHeader from "./features/Header";

export default function MainPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SimpleHeader />
      <header className="bg-gradient-to-b from-primary/20 to-background py-8 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
            Mock ENEM
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Prepare-se para o ENEM com as provas anteriores.
          </p>
        </div>
      </header>

      <main className="flex-1 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Praticidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Navegue por quaisquer questões, faça anotações e ative o
                  cronômetro
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análise de Desempenho</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Receba relatórios detalhados sobre seu desempenho e áreas que
                  precisam de mais atenção.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ambiente Realista</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Simule o ambiente real do ENEM, incluindo tempo, formato e
                  tipos de questões.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para começar?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Prepare-se adequadamente para um dos exames mais importantes da
              sua vida acadêmica.
            </p>
            <Link href="/mock-exams/years">
              <Button className="cursor-pointer" size="lg">
                Ver Simulados Disponíveis
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
