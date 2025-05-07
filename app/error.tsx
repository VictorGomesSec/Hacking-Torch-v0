"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log do erro para análise
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Algo deu errado!</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Ocorreu um erro ao processar sua solicitação. Nossa equipe foi notificada.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset} variant="outline">
          Tentar novamente
        </Button>
        <Link href="/">
          <Button>Voltar para a página inicial</Button>
        </Link>
      </div>
    </div>
  )
}
