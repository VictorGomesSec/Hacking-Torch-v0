import Link from "next/link"
import {
  Flame,
  User,
  Mail,
  MapPin,
  Briefcase,
  Github,
  Globe,
  Twitter,
  Linkedin,
  Edit,
  Award,
  Calendar,
  Users,
  Trophy,
  Settings,
  Bell,
  LogOut,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProfilePage() {
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
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Buscar eventos..."
                className="w-64 bg-zinc-900/80 border-zinc-800 pl-9 h-9 rounded-full text-sm"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 border border-zinc-700 hover:border-orange-500 transition-colors cursor-pointer">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500">JD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-800 text-white">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <Link href="/profile" className="w-full">
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
                  <Calendar className="mr-2 h-4 w-4" />
                  <Link href="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <Link href="/settings" className="w-full">
                    Configurações
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer text-red-400 hover:text-red-300">
                  <LogOut className="mr-2 h-4 w-4" />
                  <Link href="/" className="w-full">
                    Sair
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="relative mb-8">
          <div className="h-48 rounded-xl overflow-hidden bg-gradient-to-r from-red-900/30 to-orange-900/30">
            <img
              src="/placeholder.svg?height=192&width=1200&text=Cover"
              alt="Cover"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          <div className="absolute bottom-0 left-8 transform translate-y-1/2 flex items-end">
            <Avatar className="h-24 w-24 border-4 border-black">
              <AvatarImage src="/placeholder.svg?height=96&width=96&text=JD" />
              <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500 text-2xl">JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm" className="border-zinc-700">
              <Edit className="h-4 w-4 mr-1.5" /> Editar Perfil
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>João Silva</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Briefcase className="h-4 w-4" />
                  <span>Desenvolvedor Frontend</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin className="h-4 w-4" />
                  <span>São Paulo, Brasil</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Mail className="h-4 w-4" />
                  <span>joao.silva@email.com</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Globe className="h-4 w-4" />
                  <Link href="#" className="text-orange-400 hover:text-orange-300">
                    joaosilva.dev
                  </Link>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="icon" className="rounded-full border-zinc-700">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-zinc-700">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-zinc-700">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Habilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                    React
                  </Badge>
                  <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                    TypeScript
                  </Badge>
                  <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                    Next.js
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    Node.js
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    UI/UX
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    TailwindCSS
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                    GraphQL
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Certificados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((cert) => (
                  <div key={cert} className="flex items-start gap-3 p-2 rounded-lg hover:bg-zinc-800/50">
                    <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <Award className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <div className="font-medium">Hackathon Future Tech {cert}</div>
                      <div className="text-sm text-zinc-400">Emitido em Nov, 2024</div>
                    </div>
                  </div>
                ))}
                <Link
                  href="/event/certificate"
                  className="text-sm text-orange-400 hover:text-orange-300 flex justify-end"
                >
                  Ver todos →
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Sobre</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300">
                  Desenvolvedor Frontend apaixonado por criar interfaces intuitivas e acessíveis. Especializado em React
                  e TypeScript, com experiência em desenvolvimento de aplicações web modernas. Entusiasta de hackathons
                  e eventos de tecnologia, sempre buscando aprender e compartilhar conhecimento com a comunidade.
                </p>
              </CardContent>
            </Card>

            <Tabs defaultValue="events">
              <TabsList className="bg-zinc-900/50">
                <TabsTrigger value="events">Eventos</TabsTrigger>
                <TabsTrigger value="teams">Times</TabsTrigger>
                <TabsTrigger value="achievements">Conquistas</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((event) => (
                    <Card key={event} className="bg-zinc-900/50 border-zinc-800">
                      <div className="flex p-4">
                        <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                          <img
                            src={`/placeholder.svg?height=64&width=64&text=E${event}`}
                            alt={`Event ${event}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">Hackathon Future Tech {event}</h3>
                          <div className="text-sm text-zinc-400 mb-1">Nov, 2024</div>
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="border-orange-500/50 text-orange-400 text-xs">
                              {event % 2 === 0 ? "Participante" : "2º Lugar"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="teams" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map((team) => (
                    <Card key={team} className="bg-zinc-900/50 border-zinc-800">
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
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
                        <div className="flex -space-x-2 mb-2">
                          {[1, 2, 3, 4].map((member) => (
                            <Avatar key={member} className="border-2 border-zinc-900 h-6 w-6">
                              <AvatarImage src={`/placeholder.svg?height=24&width=24&text=${member}`} />
                              <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500 text-xs">
                                {member}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                            Hackathon Future Tech {team}
                          </Badge>
                          <Link href="/event/team" className="text-sm text-orange-400 hover:text-orange-300">
                            Ver time →
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Hackathons", value: "12", icon: <Calendar className="h-5 w-5 text-orange-400" /> },
                    { title: "Times", value: "8", icon: <Users className="h-5 w-5 text-orange-400" /> },
                    { title: "Prêmios", value: "3", icon: <Trophy className="h-5 w-5 text-orange-400" /> },
                  ].map((stat, index) => (
                    <Card key={index} className="bg-zinc-900/50 border-zinc-800">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-3">
                          {stat.icon}
                        </div>
                        <div className="text-3xl font-bold mb-1">{stat.value}</div>
                        <div className="text-zinc-400">{stat.title}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Conquistas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { title: "Primeiro Hackathon", desc: "Participou do primeiro evento", date: "Jan, 2023" },
                      { title: "Formador de Time", desc: "Criou seu primeiro time", date: "Mar, 2023" },
                      { title: "Vencedor de Bronze", desc: "Conquistou o 3º lugar", date: "Jun, 2023" },
                      { title: "Vencedor de Prata", desc: "Conquistou o 2º lugar", date: "Nov, 2023" },
                      { title: "Mentor", desc: "Ajudou novos participantes", date: "Fev, 2024" },
                    ].map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg">
                        <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{achievement.title}</div>
                          <div className="text-sm text-zinc-400">{achievement.desc}</div>
                        </div>
                        <div className="text-xs text-zinc-500">{achievement.date}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <footer className="border-t border-zinc-800 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                HackingTorch
              </span>
            </div>
            <div className="flex gap-4 text-zinc-500 text-sm">
              <Link href="#" className="hover:text-orange-400">
                Sobre
              </Link>
              <Link href="#" className="hover:text-orange-400">
                Contato
              </Link>
              <Link href="#" className="hover:text-orange-400">
                Termos
              </Link>
              <Link href="#" className="hover:text-orange-400">
                Privacidade
              </Link>
            </div>
            <div className="text-zinc-500 text-sm">© 2025 HackingTorch. Todos os direitos reservados.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
