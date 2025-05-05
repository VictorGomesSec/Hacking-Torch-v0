"use client"

import Link from "next/link"
import { useState } from "react"
import { Flame, Mail, Lock, Github, ChromeIcon as Google, User, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function RegisterPage() {
  const [userType, setUserType] = useState("participant")

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
            <h1 className="text-2xl font-bold mb-2">Crie sua conta</h1>
            <p className="text-zinc-400">Junte-se à comunidade de eventos tech</p>
          </div>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle>Cadastro</CardTitle>
              <CardDescription className="text-zinc-400">
                Escolha seu tipo de conta e preencha seus dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div
                    className={`flex flex-col items-center justify-between rounded-md border-2 ${
                      userType === "participant" ? "border-orange-500" : "border-zinc-800"
                    } bg-zinc-950 p-4 hover:bg-zinc-900 hover:border-orange-500/50 cursor-pointer`}
                    onClick={() => setUserType("participant")}
                  >
                    <User className="mb-3 h-6 w-6 text-orange-400" />
                    <div className="font-medium">Participante</div>
                    <div className="text-xs text-zinc-400 text-center mt-1">Participe de hackathons e eventos</div>
                  </div>
                </div>
                <div>
                  <div
                    className={`flex flex-col items-center justify-between rounded-md border-2 ${
                      userType === "organizer" ? "border-orange-500" : "border-zinc-800"
                    } bg-zinc-950 p-4 hover:bg-zinc-900 hover:border-orange-500/50 cursor-pointer`}
                    onClick={() => setUserType("organizer")}
                  >
                    <Briefcase className="mb-3 h-6 w-6 text-orange-400" />
                    <div className="font-medium">Organizador</div>
                    <div className="text-xs text-zinc-400 text-center mt-1">Crie e gerencie seus próprios eventos</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-sm font-medium">
                    Nome
                  </label>
                  <Input id="first-name" placeholder="João" className="bg-zinc-800 border-zinc-700" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-sm font-medium">
                    Sobrenome
                  </label>
                  <Input id="last-name" placeholder="Silva" className="bg-zinc-800 border-zinc-700" />
                </div>
              </div>

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
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-zinc-800 border-zinc-700 pl-10"
                  />
                </div>
                <p className="text-xs text-zinc-500">Mínimo de 8 caracteres com letras, números e símbolos</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-zinc-800 border-zinc-700 pl-10"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Eu concordo com os{" "}
                  <Link href="#" className="text-orange-400 hover:text-orange-300">
                    Termos de Serviço
                  </Link>{" "}
                  e{" "}
                  <Link href="#" className="text-orange-400 hover:text-orange-300">
                    Política de Privacidade
                  </Link>
                </label>
              </div>

              <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                <Link href="/dashboard" className="w-full text-white">
                  Criar conta
                </Link>
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full border-zinc-800" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-zinc-900 px-2 text-zinc-500">ou continue com</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-zinc-700">
                  <Github className="h-4 w-4 mr-2" /> Github
                </Button>
                <Button variant="outline" className="border-zinc-700">
                  <Google className="h-4 w-4 mr-2" /> Google
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-zinc-800 p-4">
              <p className="text-sm text-zinc-400">
                Já tem uma conta?{" "}
                <Link href="/auth/login" className="text-orange-400 hover:text-orange-300">
                  Faça login
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
