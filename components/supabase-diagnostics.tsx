"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { supabaseConfig } from "@/lib/supabase/config"

export function SupabaseDiagnostics() {
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<Array<{ test: string; status: "success" | "error"; message: string }>>([])

  const runDiagnostics = async () => {
    setIsRunning(true)
    setResults([])

    // Verificar variáveis de ambiente
    const envTest = {
      test: "Variáveis de ambiente",
      status: "error" as const,
      message: "Variáveis de ambiente não configuradas corretamente",
    }

    if (supabaseConfig.isValid()) {
      envTest.status = "success"
      envTest.message = "Variáveis de ambiente configuradas corretamente"
    }

    setResults((prev) => [...prev, envTest])

    // Verificar conectividade com o Supabase
    const connectivityTest = {
      test: "Conectividade com o Supabase",
      status: "error" as const,
      message: "Não foi possível conectar ao Supabase",
    }

    try {
      const response = await fetch(supabaseConfig.supabaseUrl, {
        method: "HEAD",
        mode: "no-cors",
      })
      connectivityTest.status = "success"
      connectivityTest.message = "Conectividade com o Supabase estabelecida"
    } catch (error) {
      connectivityTest.message = `Erro de conectividade: ${error instanceof Error ? error.message : "Erro desconhecido"}`
    }

    setResults((prev) => [...prev, connectivityTest])

    // Verificar CORS
    const corsTest = {
      test: "Configuração de CORS",
      status: "error" as const,
      message: "Não foi possível verificar a configuração de CORS",
    }

    try {
      const response = await fetch(`${supabaseConfig.supabaseUrl}/auth/v1/settings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseConfig.supabaseKey,
        },
      })

      if (response.ok) {
        corsTest.status = "success"
        corsTest.message = "Configuração de CORS parece estar correta"
      } else {
        corsTest.message = `Erro na verificação de CORS: ${response.status} ${response.statusText}`
      }
    } catch (error) {
      corsTest.message = `Erro na verificação de CORS: ${error instanceof Error ? error.message : "Erro desconhecido"}`
    }

    setResults((prev) => [...prev, corsTest])

    setIsRunning(false)
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mt-6">
      <h3 className="text-lg font-semibold mb-4">Diagnóstico do Supabase</h3>
      <Button onClick={runDiagnostics} disabled={isRunning} className="mb-4">
        {isRunning ? "Executando diagnóstico..." : "Executar diagnóstico"}
      </Button>

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-3 rounded-md ${
                result.status === "success"
                  ? "bg-green-900/30 border border-green-800"
                  : "bg-red-900/30 border border-red-800"
              }`}
            >
              <div className="font-medium">{result.test}</div>
              <div className="text-sm mt-1">{result.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
