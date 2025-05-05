import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Bookmark,
  ChevronRight,
  Flame,
  Trophy,
  Zap,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function EventDetailsPage() {
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
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              Explorar
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              Criar Evento
            </Button>
            <Avatar className="h-8 w-8 border border-zinc-700 hover:border-orange-500 transition-colors">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Event Hero */}
      <div className="relative h-64 md:h-80">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 to-orange-900/40 z-0" />
        <img
          src="/placeholder.svg?height=400&width=1200&text=Hackathon%20Banner"
          alt="Hackathon Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-20">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-2 text-sm">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para eventos
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Hackathon Future Tech</h1>
                <div className="flex flex-wrap gap-2 items-center text-sm text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>12-14 Jun, 2025</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>48 horas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>São Paulo, SP</span>
                  </div>
                  <Badge className="bg-gradient-to-r from-red-600 to-orange-500">Presencial</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full border-zinc-700">
                  <Share2 className="h-4 w-4 mr-1" /> Compartilhar
                </Button>
                <Button variant="outline" size="sm" className="rounded-full border-zinc-700">
                  <Bookmark className="h-4 w-4 mr-1" /> Salvar
                </Button>
                <Button
                  size="sm"
                  className="rounded-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400"
                >
                  <Link href="/event/check-in" className="text-white">
                    Inscrever-se
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="bg-zinc-900/50 mb-6">
                <TabsTrigger value="about">Sobre</TabsTrigger>
                <TabsTrigger value="schedule">Programação</TabsTrigger>
                <TabsTrigger value="prizes">Prêmios</TabsTrigger>
                <TabsTrigger value="teams">Times</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Sobre o evento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      O Hackathon Future Tech é um evento de 48 horas que reúne desenvolvedores, designers e entusiastas
                      de tecnologia para criar soluções inovadoras para os desafios do futuro.
                    </p>
                    <p>
                      Nesta edição, os participantes terão a oportunidade de trabalhar em projetos relacionados a
                      Inteligência Artificial, Blockchain e Internet das Coisas, com mentoria de especialistas da
                      indústria.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-zinc-800/50 p-4 rounded-lg flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
                          <Users className="h-5 w-5 text-red-400" />
                        </div>
                        <div>
                          <div className="text-sm text-zinc-400">Participantes</div>
                          <div className="font-medium">150 / 200</div>
                        </div>
                      </div>
                      <div className="bg-zinc-800/50 p-4 rounded-lg flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-orange-400" />
                        </div>
                        <div>
                          <div className="text-sm text-zinc-400">Premiação total</div>
                          <div className="font-medium">R$ 50.000</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Organizadores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg?height=48&width=48&text=FT" />
                        <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500">FT</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Future Tech Inc.</div>
                        <div className="text-sm text-zinc-400">Organizador principal</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Patrocinadores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((sponsor) => (
                        <div
                          key={sponsor}
                          className="bg-zinc-800/50 p-4 rounded-lg flex items-center justify-center h-20"
                        >
                          <img
                            src={`/placeholder.svg?height=60&width=120&text=Sponsor%20${sponsor}`}
                            alt={`Sponsor ${sponsor}`}
                            className="max-h-full"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule">
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Programação do evento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Day 1 */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Dia 1 - 12 de Junho</h3>
                      <div className="space-y-3">
                        <div className="flex gap-3 p-3 bg-zinc-800/50 rounded-lg">
                          <div className="text-right min-w-[60px] text-zinc-400">09:00</div>
                          <div className="flex-1">
                            <div className="font-medium">Credenciamento</div>
                            <div className="text-sm text-zinc-400">Recepção e entrega de kits</div>
                          </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-zinc-800/50 rounded-lg">
                          <div className="text-right min-w-[60px] text-zinc-400">10:00</div>
                          <div className="flex-1">
                            <div className="font-medium">Cerimônia de abertura</div>
                            <div className="text-sm text-zinc-400">Apresentação dos desafios</div>
                          </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-zinc-800/50 rounded-lg">
                          <div className="text-right min-w-[60px] text-zinc-400">12:00</div>
                          <div className="flex-1">
                            <div className="font-medium">Início do hackathon</div>
                            <div className="text-sm text-zinc-400">Formação de equipes e início dos trabalhos</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Day 2 */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Dia 2 - 13 de Junho</h3>
                      <div className="space-y-3">
                        <div className="flex gap-3 p-3 bg-zinc-800/50 rounded-lg">
                          <div className="text-right min-w-[60px] text-zinc-400">09:00</div>
                          <div className="flex-1">
                            <div className="font-medium">Mentorias</div>
                            <div className="text-sm text-zinc-400">Sessões com especialistas da indústria</div>
                          </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-zinc-800/50 rounded-lg">
                          <div className="text-right min-w-[60px] text-zinc-400">14:00</div>
                          <div className="flex-1">
                            <div className="font-medium">Workshop: IA Generativa</div>
                            <div className="text-sm text-zinc-400">Aplicações práticas de IA em projetos</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Day 3 */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Dia 3 - 14 de Junho</h3>
                      <div className="space-y-3">
                        <div className="flex gap-3 p-3 bg-zinc-800/50 rounded-lg">
                          <div className="text-right min-w-[60px] text-zinc-400">10:00</div>
                          <div className="flex-1">
                            <div className="font-medium">Finalização dos projetos</div>
                            <div className="text-sm text-zinc-400">Prazo final para submissões</div>
                          </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-zinc-800/50 rounded-lg">
                          <div className="text-right min-w-[60px] text-zinc-400">14:00</div>
                          <div className="flex-1">
                            <div className="font-medium">Apresentações</div>
                            <div className="text-sm text-zinc-400">Pitch dos projetos para os jurados</div>
                          </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-zinc-800/50 rounded-lg">
                          <div className="text-right min-w-[60px] text-zinc-400">18:00</div>
                          <div className="flex-1">
                            <div className="font-medium">Premiação</div>
                            <div className="text-sm text-zinc-400">Anúncio dos vencedores e entrega de prêmios</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prizes">
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Premiação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 p-6 rounded-lg border border-zinc-700 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 -translate-y-10 translate-x-10 transform rotate-45"></div>
                        <Trophy className="h-12 w-12 text-yellow-500 mb-3" />
                        <h3 className="text-xl font-bold mb-2">1º Lugar</h3>
                        <div className="text-2xl font-bold mb-2">R$ 25.000</div>
                        <p className="text-zinc-400 text-sm">+ Incubação do projeto</p>
                      </div>
                      <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 p-6 rounded-lg border border-zinc-700 flex flex-col items-center text-center">
                        <Trophy className="h-10 w-10 text-zinc-400 mb-3" />
                        <h3 className="text-xl font-bold mb-2">2º Lugar</h3>
                        <div className="text-2xl font-bold mb-2">R$ 15.000</div>
                        <p className="text-zinc-400 text-sm">+ Mentoria especializada</p>
                      </div>
                      <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 p-6 rounded-lg border border-zinc-700 flex flex-col items-center text-center">
                        <Trophy className="h-10 w-10 text-orange-400 mb-3" />
                        <h3 className="text-xl font-bold mb-2">3º Lugar</h3>
                        <div className="text-2xl font-bold mb-2">R$ 10.000</div>
                        <p className="text-zinc-400 text-sm">+ Créditos em nuvem</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Categorias especiais</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-zinc-800/50 p-4 rounded-lg flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                            <Zap className="h-5 w-5 text-red-400" />
                          </div>
                          <div>
                            <div className="font-medium">Melhor Inovação em IA</div>
                            <div className="text-sm text-zinc-400">R$ 5.000 + Acesso a APIs premium</div>
                          </div>
                        </div>
                        <div className="bg-zinc-800/50 p-4 rounded-lg flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center mt-1">
                            <Zap className="h-5 w-5 text-orange-400" />
                          </div>
                          <div>
                            <div className="font-medium">Melhor UX/UI</div>
                            <div className="text-sm text-zinc-400">R$ 5.000 + Licenças de software</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="teams">
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Times participantes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((team) => (
                        <div key={team} className="bg-zinc-800/50 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=T${team}`} />
                                <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500">
                                  T{team}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">Team Innovators {team}</div>
                                <div className="text-sm text-zinc-400">4 membros</div>
                              </div>
                            </div>
                            <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                              {team % 2 === 0 ? "IA" : "Web3"}
                            </Badge>
                          </div>
                          <div className="flex -space-x-2 mb-2">
                            {[1, 2, 3, 4].map((member) => (
                              <Avatar key={member} className="border-2 border-zinc-800 h-8 w-8">
                                <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${member}`} />
                                <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500 text-xs">
                                  {member}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Status do evento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Inscrições</span>
                    <span className="font-medium">150/200</span>
                  </div>
                  <Progress value={75} className="h-2 bg-zinc-800">
                    <div className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full" />
                  </Progress>
                </div>
                <div className="bg-zinc-800/50 p-3 rounded-lg flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Inscrições abertas</div>
                    <div className="text-zinc-400">Até 10 de Junho</div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                  <Link href="/event/check-in" className="text-white">
                    Inscrever-se agora
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Requisitos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-400 mt-1" />
                  <div className="text-sm">Conhecimento básico de programação</div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-400 mt-1" />
                  <div className="text-sm">Laptop com ambiente de desenvolvimento</div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-400 mt-1" />
                  <div className="text-sm">Documento de identificação com foto</div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-400 mt-1" />
                  <div className="text-sm">Disponibilidade durante todo o evento</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Eventos relacionados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((event) => (
                  <Link href="#" key={event} className="flex items-start gap-3 p-2 rounded-lg hover:bg-zinc-800/50">
                    <img
                      src={`/placeholder.svg?height=60&width=60&text=${event}`}
                      alt={`Event ${event}`}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">Workshop Tech {event}</div>
                      <div className="text-sm text-zinc-400">20 Jun, 2025</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-zinc-500 mt-1" />
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
