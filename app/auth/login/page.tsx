"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Flame, Mail, Lock, Github, ChromeIcon as Google } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const { signIn } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Estado para login
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  // Estado para cadastro
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      })
      return
    }

    setIsLoggingIn(true)

    try {
      const { error } = await signIn(email, password)

      if (error) {
        toast({
          title: "Erro ao fazer login",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta!",
        })
        router.push("/dashboard")
      }
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoggingIn(false)
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
            <h1 className="text-2xl font-bold mb-2">Bem-vindo de volta</h1>
            <p className="text-zinc-400">Acesse sua conta para continuar</p>
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={!showRegister ? "default" : "outline"}
                className={!showRegister ? "bg-orange-500" : "border-zinc-700"}
                onClick={() => setShowRegister(false)}
              >
                Login
              </Button>
              <Button
                variant={showRegister ? "default" : "outline"}
                className={showRegister ? "bg-orange-500" : "border-zinc-700"}
                onClick={() => setShowRegister(true)}
              >
                Cadastro
              </Button>
            </div>
          </div>

          {!showRegister ? (
            <Card className="bg-zinc-900/50 border-zinc-800">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription className="text-zinc-400">Entre com seu e-mail e senha para acessar</CardDescription>
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

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-medium">
                        Senha
                      </label>
                      <Link href="/auth/reset-password" className="text-sm text-orange-400 hover:text-orange-300">
                        Esqueceu a senha?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="bg-zinc-800 border-zinc-700 pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Lembrar de mim
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? "Entrando..." : "Entrar"}
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
                    <Button variant="outline" className="border-zinc-700" type="button">
                      <Github className="h-4 w-4 mr-2" /> Github
                    </Button>
                    <Button variant="outline" className="border-zinc-700" type="button">
                      <Google className="h-4 w-4 mr-2" /> Google
                    </Button>
                  </div>
                </CardContent>
              </form>
              <CardFooter className="flex justify-center border-t border-zinc-800 p-4">
                <p className="text-sm text-zinc-400">
                  Não tem uma conta?{" "}
                  <Link href="/auth/register" className="text-orange-400 hover:text-orange-300">
                    Cadastre-se
                  </Link>
                </p>
              </CardFooter>
            </Card>
          ) : (
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Cadastro</CardTitle>
                <CardDescription className="text-zinc-400">Crie sua conta para participar de eventos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">
                      Nome
                    </label>
                    <Input
                      id="first-name"
                      placeholder="João"
                      className="bg-zinc-800 border-zinc-700"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">
                      Sobrenome
                    </label>
                    <Input
                      id="last-name"
                      placeholder="Silva"
                      className="bg-zinc-800 border-zinc-700"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="register-email" className="text-sm font-medium">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      className="bg-zinc-800 border-zinc-700 pl-10"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="register-password" className="text-sm font-medium">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-zinc-800 border-zinc-700 pl-10"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
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
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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

                <Button
                  type="button"
                  className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400"
                  disabled={isRegistering}
                  onClick={() => router.push("/auth/register")}
                >
                  Continuar para cadastro completo
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
                  <Button variant="outline" className="border-zinc-700" type="button">
                    <Github className="h-4 w-4 mr-2" /> Github
                  </Button>
                  <Button variant="outline" className="border-zinc-700" type="button">
                    <Google className="h-4 w-4 mr-2" /> Google
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t border-zinc-800 p-4">
                <p className="text-sm text-zinc-400">
                  Já tem uma conta?{" "}
                  <button onClick={() => setShowRegister(false)} className="text-orange-400 hover:text-orange-300">
                    Faça login
                  </button>
                </p>
              </CardFooter>
            </Card>
          )}
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
