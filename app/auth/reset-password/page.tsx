import Link from "next/link"
import { Flame, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResetPasswordPage() {
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
            <CardHeader>
              <CardTitle>Recuperação de senha</CardTitle>
              <CardDescription className="text-zinc-400">
                Digite seu e-mail para receber um link de recuperação
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
                  />
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                Enviar link de recuperação
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-zinc-800 p-4">
              <Link
                href="/auth/login"
                className="text-sm text-orange-400 hover:text-orange-300 inline-flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para o login
              </Link>
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
