"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Flame, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, informe seu e-mail.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await resetPassword(email)

      if (error) {
        toast({
          title: "Erro ao resetar senha",
          description: error.message,
          variant: "destructive",
        })
      } else {
        setSubmitted(true)
        toast({
          title: "E-mail enviado",
          description: "Verifique sua caixa de entrada para redefinir sua senha.",
        })
      }
    } catch (error) {
      toast({
        title: "Erro ao resetar senha",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <Flame className="h-8 w-8 text-orange-500" />
              <span className="font-bold text-2xl bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                HackingTorch
              </span>
            </Link>
            <h1 className="text-2xl font-bold mb-2">Recuperar senha</h1>
            <p className="text-zinc-400">Enviaremos um link para redefinir sua senha</p>
          </div>

          <Card className="bg-zinc-900/50 border-zinc-800">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Recuperação de senha</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Informe seu e-mail para receber um link de recuperação
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      E-mail
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        className="bg-zinc-800 border-zinc-700 pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar link de recuperação"}
                  </Button>
                </CardContent>
              </form>
            ) : (
              <CardContent className="py-6">
                <div className="text-center space-y-4">
                  <div className="bg-green-500/10 text-green-500 p-3 rounded-full inline-flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium">E-mail enviado</h3>
                  <p className="text-zinc-400">
                    Enviamos um link de recuperação para <span className="text-white">{email}</span>. Verifique sua
                    caixa de entrada e siga as instruções para redefinir sua senha.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-zinc-700"
                    onClick={() => {
                      setSubmitted(false)
                      setEmail("")
                    }}
                  >
                    Voltar
                  </Button>
                </div>
              </CardContent>
            )}
            <CardFooter className="flex justify-center border-t border-zinc-800 p-4">
              <p className="text-sm text-zinc-400">
                Lembrou sua senha?{" "}
                <Link href="/auth/login" className="text-orange-400 hover:text-orange-300">
                  Voltar para login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      <footer className="py-6 border-t border-zinc-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              HackingTorch
            </span>
          </div>
          <div className="text-zinc-500 text-sm">© 2025 HackingTorch. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  )
}
