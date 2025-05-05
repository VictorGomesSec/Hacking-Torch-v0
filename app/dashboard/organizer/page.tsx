"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Flame,
  User,
  Settings,
  Bell,
  LogOut,
  Search,
  Calendar,
  Plus,
  BarChart,
  Users,
  Award,
  Edit,
  Trash2,
  Eye,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/hooks/use-auth"
import { getEvents, type Event } from "@/lib/services/event-service"
import { useToast } from "@/hooks/use-toast"

export default function OrganizerDashboardPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) return

      try {
        const eventsData = await getEvents({ limit: 100 })
        // Filtrar apenas eventos do organizador atual
        const organizerEvents = eventsData.filter((event) => event.organizer_id === user.id)
        setEvents(organizerEvents)
      } catch (error) {
        console.error("Erro ao buscar eventos:", error)
        toast({
          title: "Erro ao carregar eventos",
          description: "Não foi possível carregar seus eventos. Tente novamente mais tarde.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [user, toast])

  return (
    <AuthGuard>
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
                    <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500">
                      {user?.email?.substring(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">Dashboard do Organizador</h1>
              <p className="text-zinc-400">Gerencie seus eventos e acompanhe o desempenho</p>
            </div>
            <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
              <Link href="/dashboard/create-event" className="flex items-center text-white">
                <Plus className="h-4 w-4 mr-1.5" /> Criar Evento
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-3">
                  <Calendar className="h-6 w-6 text-orange-400" />
                </div>
                <div className="text-3xl font-bold mb-1">{events.length}</div>
                <div className="text-zinc-400">Eventos Criados</div>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-orange-400" />
                </div>
                <div className="text-3xl font-bold mb-1">
                  {events.reduce((acc, event) => acc + (event.max_participants || 0), 0)}
                </div>
                <div className="text-zinc-400">Participantes Totais</div>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-3">
                  <Award className="h-6 w-6 text-orange-400" />
                </div>
                <div className="text-3xl font-bold mb-1">
                  {events.filter((event) => event.status === "completed").length}
                </div>
                <div className="text-zinc-400">Eventos Concluídos</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <TabsList className="bg-zinc-900/50">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="active">Ativos</TabsTrigger>
                <TabsTrigger value="draft">Rascunhos</TabsTrigger>
                <TabsTrigger value="completed">Concluídos</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm" className="border-zinc-700">
                  <Filter className="h-4 w-4 mr-1.5" /> Filtrar
                </Button>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                  <Input
                    placeholder="Buscar eventos..."
                    className="w-64 bg-zinc-900/80 border-zinc-800 pl-9 h-9 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
              ) : events.length === 0 ? (
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                    <Calendar className="h-12 w-12 text-zinc-600 mb-4" />
                    <h3 className="text-xl font-medium mb-2">Nenhum evento encontrado</h3>
                    <p className="text-zinc-400 mb-6">Você ainda não criou nenhum evento.</p>
                    <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                      <Link href="/dashboard/create-event" className="flex items-center text-white">
                        <Plus className="h-4 w-4 mr-1.5" /> Criar Primeiro Evento
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id} className="bg-zinc-900/50 border-zinc-800">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-48 h-32 md:h-auto">
                          <div className="relative h-full w-full">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 to-orange-500/80 mix-blend-multiply" />
                            <img
                              src={event.cover_image_url || `/placeholder.svg?height=200&width=200&text=${event.name}`}
                              alt={event.name}
                              className="w-full h-full object-cover"
                            />
                            <Badge
                              className={`absolute top-2 right-2 ${
                                event.status === "published"
                                  ? "bg-green-600"
                                  : event.status === "draft"
                                    ? "bg-yellow-600"
                                    : event.status === "completed"
                                      ? "bg-blue-600"
                                      : "bg-red-600"
                              }`}
                            >
                              {event.status === "published"
                                ? "Publicado"
                                : event.status === "draft"
                                  ? "Rascunho"
                                  : event.status === "completed"
                                    ? "Concluído"
                                    : "Cancelado"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <h3 className="font-bold text-lg">{event.name}</h3>
                              <div className="flex flex-wrap gap-2 items-center text-sm text-zinc-400 my-2">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>
                                    {new Date(event.start_date).toLocaleDateString("pt-BR")} -{" "}
                                    {new Date(event.end_date).toLocaleDateString("pt-BR")}
                                  </span>
                                </div>
                                <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                                  {event.format === "presential"
                                    ? "Presencial"
                                    : event.format === "online"
                                      ? "Online"
                                      : "Híbrido"}
                                </Badge>
                              </div>
                              <p className="text-zinc-400 text-sm line-clamp-2 mb-3">
                                {event.description || "Sem descrição"}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2 mt-4 md:mt-0">
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="border-zinc-700">
                                  <Link href={`/event/details?id=${event.id}`} className="flex items-center">
                                    <Eye className="h-4 w-4 mr-1.5" /> Ver
                                  </Link>
                                </Button>
                                <Button variant="outline" size="sm" className="border-zinc-700">
                                  <Link href={`/dashboard/edit-event?id=${event.id}`} className="flex items-center">
                                    <Edit className="h-4 w-4 mr-1.5" /> Editar
                                  </Link>
                                </Button>
                              </div>
                              <Button variant="outline" size="sm" className="border-zinc-700 text-red-400">
                                <Trash2 className="h-4 w-4 mr-1.5" /> Excluir
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-zinc-400">Inscrições</span>
                              <span className="font-medium">
                                {Math.floor(Math.random() * 100)}/{event.max_participants || 200}
                              </span>
                            </div>
                            <Progress value={Math.floor(Math.random() * 100)} className="h-2 bg-zinc-800">
                              <div className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full" />
                            </Progress>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="active" className="mt-0">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {events
                    .filter((event) => event.status === "published")
                    .map((event) => (
                      <Card key={event.id} className="bg-zinc-900/50 border-zinc-800">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-48 h-32 md:h-auto">
                            <div className="relative h-full w-full">
                              <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 to-orange-500/80 mix-blend-multiply" />
                              <img
                                src={
                                  event.cover_image_url || `/placeholder.svg?height=200&width=200&text=${event.name}`
                                }
                                alt={event.name}
                                className="w-full h-full object-cover"
                              />
                              <Badge className="absolute top-2 right-2 bg-green-600">Publicado</Badge>
                            </div>
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div>
                                <h3 className="font-bold text-lg">{event.name}</h3>
                                <div className="flex flex-wrap gap-2 items-center text-sm text-zinc-400 my-2">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                      {new Date(event.start_date).toLocaleDateString("pt-BR")} -{" "}
                                      {new Date(event.end_date).toLocaleDateString("pt-BR")}
                                    </span>
                                  </div>
                                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                                    {event.format === "presential"
                                      ? "Presencial"
                                      : event.format === "online"
                                        ? "Online"
                                        : "Híbrido"}
                                  </Badge>
                                </div>
                                <p className="text-zinc-400 text-sm line-clamp-2 mb-3">
                                  {event.description || "Sem descrição"}
                                </p>
                              </div>
                              <div className="flex flex-col gap-2 mt-4 md:mt-0">
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" className="border-zinc-700">
                                    <Link href={`/event/details?id=${event.id}`} className="flex items-center">
                                      <Eye className="h-4 w-4 mr-1.5" /> Ver
                                    </Link>
                                  </Button>
                                  <Button variant="outline" size="sm" className="border-zinc-700">
                                    <Link href={`/dashboard/edit-event?id=${event.id}`} className="flex items-center">
                                      <Edit className="h-4 w-4 mr-1.5" /> Editar
                                    </Link>
                                  </Button>
                                </div>
                                <Button variant="outline" size="sm" className="border-zinc-700 text-red-400">
                                  <Trash2 className="h-4 w-4 mr-1.5" /> Excluir
                                </Button>
                              </div>
                            </div>
                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-zinc-400">Inscrições</span>
                                <span className="font-medium">
                                  {Math.floor(Math.random() * 100)}/{event.max_participants || 200}
                                </span>
                              </div>
                              <Progress value={Math.floor(Math.random() * 100)} className="h-2 bg-zinc-800">
                                <div className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full" />
                              </Progress>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="draft" className="mt-0">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {events
                    .filter((event) => event.status === "draft")
                    .map((event) => (
                      <Card key={event.id} className="bg-zinc-900/50 border-zinc-800">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-48 h-32 md:h-auto">
                            <div className="relative h-full w-full">
                              <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 to-orange-500/80 mix-blend-multiply" />
                              <img
                                src={
                                  event.cover_image_url || `/placeholder.svg?height=200&width=200&text=${event.name}`
                                }
                                alt={event.name}
                                className="w-full h-full object-cover"
                              />
                              <Badge className="absolute top-2 right-2 bg-yellow-600">Rascunho</Badge>
                            </div>
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div>
                                <h3 className="font-bold text-lg">{event.name}</h3>
                                <div className="flex flex-wrap gap-2 items-center text-sm text-zinc-400 my-2">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                      {new Date(event.start_date).toLocaleDateString("pt-BR")} -{" "}
                                      {new Date(event.end_date).toLocaleDateString("pt-BR")}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-zinc-400 text-sm line-clamp-2 mb-3">
                                  {event.description || "Sem descrição"}
                                </p>
                              </div>
                              <div className="flex flex-col gap-2 mt-4 md:mt-0">
                                <Button variant="outline" size="sm" className="border-zinc-700">
                                  <Link href={`/dashboard/edit-event?id=${event.id}`} className="flex items-center">
                                    <Edit className="h-4 w-4 mr-1.5" /> Editar
                                  </Link>
                                </Button>
                                <Button
                                  className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400"
                                  size="sm"
                                >
                                  Publicar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {events
                    .filter((event) => event.status === "completed")
                    .map((event) => (
                      <Card key={event.id} className="bg-zinc-900/50 border-zinc-800">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-48 h-32 md:h-auto">
                            <div className="relative h-full w-full">
                              <div className="absolute inset-0 bg-gradient-to-br from-zinc-700/90 to-zinc-900/90 mix-blend-multiply" />
                              <img
                                src={
                                  event.cover_image_url || `/placeholder.svg?height=200&width=200&text=${event.name}`
                                }
                                alt={event.name}
                                className="w-full h-full object-cover grayscale"
                              />
                              <Badge className="absolute top-2 right-2 bg-blue-600">Concluído</Badge>
                            </div>
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div>
                                <h3 className="font-bold text-lg">{event.name}</h3>
                                <div className="flex flex-wrap gap-2 items-center text-sm text-zinc-400 my-2">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                      {new Date(event.start_date).toLocaleDateString("pt-BR")} -{" "}
                                      {new Date(event.end_date).toLocaleDateString("pt-BR")}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                                    {Math.floor(Math.random() * 50) + 10} Projetos
                                  </Badge>
                                  <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                                    {Math.floor(Math.random() * 200) + 50} Participantes
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 mt-4 md:mt-0">
                                <Button variant="outline" size="sm" className="border-zinc-700">
                                  <Link href={`/event/details?id=${event.id}`} className="flex items-center">
                                    <Eye className="h-4 w-4 mr-1.5" /> Ver
                                  </Link>
                                </Button>
                                <Button variant="outline" size="sm" className="border-zinc-700">
                                  <Link href={`/dashboard/event-results?id=${event.id}`} className="flex items-center">
                                    <BarChart className="h-4 w-4 mr-1.5" /> Resultados
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
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
    </AuthGuard>
  )
}
