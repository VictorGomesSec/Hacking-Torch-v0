"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Flame,
  Calendar,
  Clock,
  MapPin,
  Users,
  Bell,
  Settings,
  LogOut,
  Plus,
  Search,
  Trophy,
  BarChart,
  Ticket,
  User,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

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
                  <Ticket className="mr-2 h-4 w-4" />
                  <Link href="/dashboard/my-events" className="w-full">
                    Meus Eventos
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-zinc-400">Gerencie seus eventos e participações</p>
          </div>
          <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
            <Link href="/dashboard/create-event" className="flex items-center text-white">
              <Plus className="h-4 w-4 mr-1.5" /> Criar Evento
            </Link>
          </Button>
        </div>

        {/* Custom Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-zinc-900/50 p-1 rounded-md">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`flex-1 py-2 px-4 rounded-sm text-sm font-medium ${
                activeTab === "upcoming"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              Próximos Eventos
            </button>
            <button
              onClick={() => setActiveTab("registered")}
              className={`flex-1 py-2 px-4 rounded-sm text-sm font-medium ${
                activeTab === "registered"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              Inscritos
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`flex-1 py-2 px-4 rounded-sm text-sm font-medium ${
                activeTab === "past" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              Participações Anteriores
            </button>
          </div>

          <div className="mt-6">
            {activeTab === "upcoming" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <Link href="/event/details" key={item}>
                    <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/10">
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 to-orange-500/80 mix-blend-multiply" />
                        <img
                          src={`/placeholder.svg?height=200&width=400&text=Hackathon%20${item}`}
                          alt={`Hackathon ${item}`}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-3 right-3 bg-black/70 text-white">
                          {item % 2 === 0 ? "Online" : "Presencial"}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">Hackathon Future Tech {item}</h3>
                          <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                            {item % 3 === 0 ? "AI" : item % 2 === 0 ? "Web3" : "IoT"}
                          </Badge>
                        </div>
                        <p className="text-zinc-400 text-sm mb-3 line-clamp-2">
                          Um evento incrível para desenvolvedores, designers e entusiastas de tecnologia.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                          <Calendar className="h-4 w-4" />
                          <span>12-14 Jun, 2025</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((avatar) => (
                            <Avatar key={avatar} className="border-2 border-zinc-900 h-6 w-6">
                              <AvatarImage src={`/placeholder.svg?height=24&width=24&text=${avatar}`} />
                              <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500 text-xs">
                                {avatar}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-zinc-800 text-xs text-zinc-400 border-2 border-zinc-900">
                            +42
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-orange-400">
                          <Flame className="h-4 w-4" />
                          <span className="text-sm font-medium">{120 + item * 10}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {activeTab === "registered" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2].map((item) => (
                  <Card key={item} className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
                    <div className="relative h-40 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 to-orange-500/80 mix-blend-multiply" />
                      <img
                        src={`/placeholder.svg?height=160&width=400&text=Registered%20${item}`}
                        alt={`Registered ${item}`}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-3 right-3 bg-green-600 text-white">Inscrito</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2">DevConf 2025 - Edição {item}</h3>
                      <div className="flex flex-wrap gap-2 items-center text-sm text-zinc-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>20-22 Jul, 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>Rio de Janeiro, RJ</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="text-zinc-400">Status: </span>
                          <span className="text-green-400 font-medium">Confirmado</span>
                        </div>
                        <Link
                          href="/event/check-in"
                          className="text-orange-400 hover:text-orange-300 text-sm font-medium"
                        >
                          Ver QR Code →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "past" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <Card key={item} className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
                    <div className="relative h-40 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-700/90 to-zinc-900/90 mix-blend-multiply" />
                      <img
                        src={`/placeholder.svg?height=160&width=400&text=Past%20${item}`}
                        alt={`Past ${item}`}
                        className="w-full h-full object-cover grayscale"
                      />
                      <Badge className="absolute top-3 right-3 bg-zinc-700 text-white">Concluído</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2">TechSummit 2024 - Edição {item}</h3>
                      <div className="flex flex-wrap gap-2 items-center text-sm text-zinc-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>10-12 Nov, 2024</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4" />
                          <span>2º Lugar</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-4 w-4 text-zinc-500" />
                          <span className="text-zinc-400">Team Innovators</span>
                        </div>
                        <Link
                          href="/event/certificate"
                          className="text-orange-400 hover:text-orange-300 text-sm font-medium"
                        >
                          Ver certificado →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-zinc-900/50 border-zinc-800 col-span-2">
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    title: "Inscrição confirmada",
                    event: "Hackathon Future Tech",
                    time: "Hoje, 10:30",
                    icon: <Ticket className="h-5 w-5 text-green-400" />,
                  },
                  {
                    title: "Novo membro no time",
                    event: "Team Innovators",
                    time: "Ontem, 15:45",
                    icon: <Users className="h-5 w-5 text-blue-400" />,
                  },
                  {
                    title: "Certificado emitido",
                    event: "TechSummit 2024",
                    time: "3 dias atrás",
                    icon: <Award className="h-5 w-5 text-orange-400" />,
                  },
                  {
                    title: "Projeto submetido",
                    event: "Hackathon Future Tech",
                    time: "1 semana atrás",
                    icon: <BarChart className="h-5 w-5 text-purple-400" />,
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-sm text-zinc-400">{activity.event}</div>
                    </div>
                    <div className="text-xs text-zinc-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle>Próximos Prazos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    title: "Submissão de Projeto",
                    event: "Hackathon Future Tech",
                    date: "14 Jun, 18:00",
                    progress: 70,
                  },
                  {
                    title: "Inscrição",
                    event: "DevConf 2025",
                    date: "30 Jun, 23:59",
                    progress: 30,
                  },
                  {
                    title: "Formação de Equipe",
                    event: "Hackathon Future Tech",
                    date: "10 Jun, 12:00",
                    progress: 90,
                  },
                ].map((deadline, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{deadline.title}</div>
                        <div className="text-sm text-zinc-400">{deadline.event}</div>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-4 w-4 text-orange-400" />
                        <span className="text-orange-400">{deadline.date}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full"
                          style={{ width: `${deadline.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-zinc-500">
                        <span>Hoje</span>
                        <span>{deadline.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
