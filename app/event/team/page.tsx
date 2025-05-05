import Link from "next/link"
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Copy,
  Flame,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Share2,
  UserPlus,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TeamManagementPage() {
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
        <Link href="/event/check-in" className="inline-flex items-center text-zinc-400 hover:text-white mb-4 text-sm">
          <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para check-in
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Gerenciamento de Time</h1>
            <p className="text-zinc-400">Hackathon Future Tech</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-zinc-700">
              <Settings className="h-4 w-4 mr-1.5" /> Configurações
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400"
            >
              <UserPlus className="h-4 w-4 mr-1.5" /> Convidar
            </Button>
          </div>
        </div>

        <Tabs defaultValue="team">
          <TabsList className="bg-zinc-900/50 mb-6">
            <TabsTrigger value="team">Meu Time</TabsTrigger>
            <TabsTrigger value="find">Encontrar Time</TabsTrigger>
            <TabsTrigger value="create">Criar Time</TabsTrigger>
          </TabsList>

          <TabsContent value="team" className="space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">Team Innovators</CardTitle>
                  <Badge className="bg-gradient-to-r from-red-600 to-orange-500">4/5 Membros</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16 border-2 border-orange-500">
                      <AvatarImage src="/placeholder.svg?height=64&width=64&text=TI" />
                      <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500 text-xl">
                        TI
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-lg">Team Innovators</div>
                      <div className="text-sm text-zinc-400">Criado em 10 de Junho, 2025</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                          IA
                        </Badge>
                        <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                          Web3
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-zinc-700">
                      <Share2 className="h-4 w-4 mr-1.5" /> Compartilhar
                    </Button>
                    <div className="relative">
                      <Input value="TEAM-INNO-25" readOnly className="w-36 bg-zinc-800 border-zinc-700 text-sm pr-8" />
                      <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Membros da equipe</h3>
                  <div className="space-y-3">
                    <div className="bg-zinc-800/50 p-3 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40&text=JD" />
                          <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500">JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">João Silva</div>
                          <div className="text-sm text-zinc-400">Desenvolvedor Frontend</div>
                        </div>
                      </div>
                      <Badge>Líder</Badge>
                    </div>

                    <div className="bg-zinc-800/50 p-3 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40&text=MS" />
                          <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500">MS</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Maria Santos</div>
                          <div className="text-sm text-zinc-400">UX/UI Designer</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="bg-zinc-800/50 p-3 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40&text=PL" />
                          <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500">PL</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Pedro Lima</div>
                          <div className="text-sm text-zinc-400">Desenvolvedor Backend</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="bg-zinc-800/50 p-3 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40&text=AC" />
                          <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500">AC</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Ana Costa</div>
                          <div className="text-sm text-zinc-400">Data Scientist</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button variant="outline" className="w-full border-dashed border-zinc-700 h-16">
                      <Plus className="h-5 w-5 mr-2" /> Adicionar membro (1 vaga restante)
                    </Button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between border-t border-zinc-800 p-4">
                <Button
                  variant="outline"
                  className="border-zinc-700 text-red-400 hover:text-red-300 hover:border-red-900 hover:bg-red-950/20"
                >
                  <X className="h-4 w-4 mr-1.5" /> Sair do time
                </Button>
                <Link
                  href="/event/submission"
                  className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-medium text-sm"
                >
                  Ir para submissão <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="find" className="space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Encontrar um time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="Buscar times por nome ou código..."
                    className="bg-zinc-800 border-zinc-700 pl-10"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                  <Button className="absolute right-1 top-1 rounded-md bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                    Buscar
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Com vagas
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    IA
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Web3
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    IoT
                  </Badge>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="bg-zinc-800/50 p-4 rounded-lg flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg?height=48&width=48&text=T1" />
                        <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500">T1</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Tech Wizards</div>
                        <div className="text-sm text-zinc-400 mb-1">3/5 membros</div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                            IA
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400"
                    >
                      Solicitar
                    </Button>
                  </div>

                  <div className="bg-zinc-800/50 p-4 rounded-lg flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg?height=48&width=48&text=T2" />
                        <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500">T2</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Blockchain Builders</div>
                        <div className="text-sm text-zinc-400 mb-1">4/5 membros</div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                            Web3
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400"
                    >
                      Solicitar
                    </Button>
                  </div>

                  <div className="bg-zinc-800/50 p-4 rounded-lg flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg?height=48&width=48&text=T3" />
                        <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500">T3</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Data Dreamers</div>
                        <div className="text-sm text-zinc-400 mb-1">2/5 membros</div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                            IA
                          </Badge>
                          <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                            IoT
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400"
                    >
                      Solicitar
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Button variant="outline" className="border-zinc-700">
                    <RefreshCw className="h-4 w-4 mr-1.5" /> Carregar mais
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Criar um novo time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Nome do time</label>
                  <Input placeholder="Digite o nome do seu time" className="bg-zinc-800 border-zinc-700" />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Áreas de interesse</label>
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
                  <label className="text-sm font-medium block mb-2">Descrição do time</label>
                  <textarea
                    placeholder="Descreva brevemente o seu time e o que vocês pretendem desenvolver..."
                    className="w-full h-24 bg-zinc-800 border-zinc-700 rounded-md p-2 text-white"
                  ></textarea>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Tamanho máximo do time</label>
                  <div className="flex items-center gap-4">
                    <Input type="number" value="5" min="2" max="5" className="w-20 bg-zinc-800 border-zinc-700" />
                    <div className="text-sm text-zinc-400">Máximo: 5 membros</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Visibilidade do time</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="radio" id="public" name="visibility" className="mr-2" checked />
                      <label htmlFor="public">Público (qualquer pessoa pode solicitar para entrar)</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="private" name="visibility" className="mr-2" />
                      <label htmlFor="private">Privado (apenas por convite)</label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-zinc-800 p-4">
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                  Criar time
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
