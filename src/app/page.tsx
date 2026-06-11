import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Sparkles, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/50 px-4 py-1.5 text-sm text-slate-300 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Crie carrosséis profissionais com IA</span>
        </div>

        {/* Heading */}
        <h1 className="max-w-3xl bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl">
          Carrossel
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            Flow
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-lg leading-relaxed text-slate-400 sm:text-xl">
          Transforme análises editoriais em carrosséis visuais impactantes para
          redes sociais. Design profissional em minutos, não em horas.
        </p>

        {/* Features row */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-blue-400" />
            <span>Templates editáveis</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-400" />
            <span>Importação via JSON</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <span>Exportação PNG & PDF</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/login">
            <Button
              size="lg"
              className="group relative h-12 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30"
            >
              Entrar
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-xs text-slate-600">
          Comece gratuitamente · Até 3 projetos no plano free
        </p>
      </main>
    </div>
  );
}
