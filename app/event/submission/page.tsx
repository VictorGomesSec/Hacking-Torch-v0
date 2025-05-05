import Link from "next/link"
import {
  ArrowLeft,
  Check,
  Clock,
  Download,
  File,
  FileText,
  Flame,
  Github,
  ImageIcon,
  Info,
  Link2,
  UploadCloud,
  Video,
  X,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function SubmissionPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-black/80 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-xl bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              HackingTorch
            </span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/event/team" className="inline-flex items-center text-zinc-400 hover:text-white mb-4 text-sm">
          <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para gerenciamento de time
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Submissão de Projeto</h1>
            <p className="text-zinc-400">Hackathon Future Tech</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-orange-400" />
            <span className="text-orange-400 font-medium">Prazo: 14 Jun, 18:00</span>
          </div>
        </div>

        <Card className="bg-zinc-900/50 border-zinc-800 mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">Team Innovators</CardTitle>
              <Badge className="bg-gradient-to-r from-red-600 to-orange-500">Submissão aberta</Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-12 w-12 border-2 border-orange-500">
                <AvatarImage src="/placeholder.svg?height=48&width=48&text=TI" />
                <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500">TI</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-bold">Team Innovators</div>
                <div className="text-sm text-zinc-400">4 membros</div>
              </div>
            </div>

            <div className="bg-orange-950/30 border border-orange-900/50 p-4 rounded-lg flex gap-3 mb-4">
              <Info className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-orange-400 mb-1">Importante</p>
                <p className="text-zinc-300">
                  Você só pode enviar uma submissão por equipe. Certifique-se de que todos os membros revisaram o
                  projeto antes de enviar.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Nome do projeto</label>
                <Input placeholder="Digite o nome do seu projeto" className="bg-zinc-800 border-zinc-700" />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Descrição curta</label>
                <Input
                  placeholder="Uma breve descrição do seu projeto (máx. 100 caracteres)"
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Descrição detalhada</label>
                <Textarea
                  placeholder="Descreva seu projeto, o problema que ele resolve e como funciona..."
                  className="min-h-32 bg-zinc-800 border-zinc-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Categorias</label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-orange-500/50 text-orange-400 cursor-pointer">
                    <Check className="h-3 w-3 mr-1" /> IA
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400 cursor-pointer hover:border-orange-500/50 hover:text-orange-400"
                  >
                    Web3
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400 cursor-pointer hover:border-orange-500/50 hover:text-orange-400"
                  >
                    IoT
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400 cursor-pointer hover:border-orange-500/50 hover:text-orange-400"
                  >
                    Mobile
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400 cursor-pointer hover:border-orange-500/50 hover:text-orange-400"
                  >
                    Cloud
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Link do repositório</label>
                <div className="relative">
                  <Github className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                  <Input
                    placeholder="https://github.com/seu-usuario/seu-repositorio"
                    className="bg-zinc-800 border-zinc-700 pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Link do demo (opcional)</label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                  <Input placeholder="https://seu-demo.com" className="bg-zinc-800 border-zinc-700 pl-10" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Vídeo de apresentação</label>
                <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center hover:border-orange-500/50 transition-colors">
                  <div className="flex flex-col items-center">
                    <Video className="h-10 w-10 text-zinc-500 mb-3" />
                    <p className="text-zinc-300 mb-2">Arraste e solte seu vídeo aqui ou clique para fazer upload</p>
                    <p className="text-zinc-500 text-sm mb-4">MP4, MOV ou WebM (máx. 100MB)</p>
                    <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                      <UploadCloud className="h-4 w-4 mr-2" /> Selecionar arquivo
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Imagens do projeto</label>
                <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 hover:border-orange-500/50 transition-colors">
                  <div className="flex flex-col items-center text-center mb-4">
                    <ImageIcon className="h-8 w-8 text-zinc-500 mb-2" />
                    <p className="text-zinc-300 text-sm">Arraste e solte imagens ou clique para fazer upload</p>
                    <p className="text-zinc-500 text-xs">PNG, JPG ou GIF (máx. 5MB cada, até 5 imagens)</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    <div className="relative bg-zinc-800 rounded-md aspect-video flex items-center justify-center overflow-hidden group">
                      <img
                        src="/placeholder.svg?height=120&width=200&text=Screenshot%201"
                        alt="Screenshot 1"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="ghost" size="icon" className="text-white hover:text-red-400">
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="relative bg-zinc-800 rounded-md aspect-video flex items-center justify-center overflow-hidden group">
                      <img
                        src="/placeholder.svg?height=120&width=200&text=Screenshot%202"
                        alt="Screenshot 2"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="ghost" size="icon" className="text-white hover:text-red-400">
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-zinc-800/50 border-2 border-dashed border-zinc-700 rounded-md aspect-video flex flex-col items-center justify-center text-zinc-500 hover:border-orange-500/30 hover:text-orange-400 transition-colors cursor-pointer">
                      <Plus className="h-6 w-6 mb-1" />
                      <span className="text-xs">Adicionar</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Arquivos adicionais (opcional)</label>
                <div className="space-y-2">
                  <div className="bg-zinc-800/50 p-3 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-md bg-zinc-700 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-zinc-300" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">documentacao.pdf</div>
                        <div className="text-xs text-zinc-400">2.4 MB</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-400">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full border-dashed border-zinc-700 h-10">
                    <File className="h-4 w-4 mr-2" /> Adicionar arquivo
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t border-zinc-800 p-4">
            <Button variant="outline" className="border-zinc-700">
              Salvar rascunho
            </Button>
            <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
              <Link href="/event/certificate" className="text-white">
                Enviar projeto
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="flex justify-between">
          <Link href="/event/team" className="text-sm text-zinc-400 hover:text-white">
            ← Voltar para o time
          </Link>
          <Link href="/event/certificate" className="text-sm text-orange-400 hover:text-orange-300">
            Ver certificado →
          </Link>
        </div>
      </div>
    </div>
  )
}
