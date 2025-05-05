import Link from "next/link"
import {
  Flame,
  User,
  Settings,
  Bell,
  LogOut,
  Search,
  Calendar,
  Clock,
  MapPin,
  Upload,
  Plus,
  Trash2,
  ArrowLeft,
  Globe,
  DollarSign,
  Users,
  CalendarRange,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateEventPage() {
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
        <Link
          href="/dashboard/organizer"
          className="inline-flex items-center text-zinc-400 hover:text-white mb-4 text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para dashboard do organizador
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Criar Novo Evento</h1>
            <p className="text-zinc-400">Preencha os detalhes para criar seu evento tech</p>
          </div>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="bg-zinc-900/50">
            <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="schedule">Programação</TabsTrigger>
            <TabsTrigger value="prizes">Prêmios</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="event-name">Nome do Evento</Label>
                  <Input
                    id="event-name"
                    placeholder="Ex: Hackathon Future Tech 2025"
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-description">Descrição</Label>
                  <Textarea
                    id="event-description"
                    placeholder="Descreva seu evento..."
                    className="min-h-32 bg-zinc-800 border-zinc-700"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-type">Tipo de Evento</Label>
                    <Select>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        <SelectItem value="hackathon">Hackathon</SelectItem>
                        <SelectItem value="ideathon">Ideathon</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="conference">Conferência</SelectItem>
                        <SelectItem value="meetup">Meetup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-format">Formato</Label>
                    <Select>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Selecione o formato" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        <SelectItem value="presential">Presencial</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="hybrid">Híbrido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Categorias</Label>
                  <div className="flex flex-wrap gap-2">
                    {["IA", "Web3", "IoT", "Mobile", "Cloud", "DevOps", "Data Science", "Blockchain"].map(
                      (category) => (
                        <Badge
                          key={category}
                          variant="outline"
                          className="border-zinc-700 text-zinc-400 cursor-pointer hover:border-orange-500/50 hover:text-orange-400"
                        >
                          {category}
                        </Badge>
                      ),
                    )}
                    <Badge
                      variant="outline"
                      className="border-zinc-700 text-zinc-400 cursor-pointer hover:border-orange-500/50 hover:text-orange-400"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Adicionar
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Imagem de Capa</Label>
                  <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center hover:border-orange-500/50 transition-colors">
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-zinc-500 mb-3" />
                      <p className="text-zinc-300 mb-2">Arraste e solte uma imagem aqui ou clique para fazer upload</p>
                      <p className="text-zinc-500 text-sm mb-4">PNG, JPG ou GIF (máx. 5MB)</p>
                      <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                        Selecionar arquivo
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
                  Próximo: Detalhes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Detalhes do Evento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Data de Início</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                      <Input id="start-date" type="date" className="bg-zinc-800 border-zinc-700 pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">Data de Término</Label>
                    <div className="relative">
                      <CalendarRange className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                      <Input id="end-date" type="date" className="bg-zinc-800 border-zinc-700 pl-10" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Horário de Início</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                      <Input id="start-time" type="time" className="bg-zinc-800 border-zinc-700 pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">Horário de Término</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                      <Input id="end-time" type="time" className="bg-zinc-800 border-zinc-700 pl-10" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                    <Input
                      id="location"
                      placeholder="Ex: Centro de Convenções, São Paulo, SP"
                      className="bg-zinc-800 border-zinc-700 pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="online-url">URL do Evento (para eventos online)</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                    <Input
                      id="online-url"
                      placeholder="Ex: https://meet.google.com/xyz"
                      className="bg-zinc-800 border-zinc-700 pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-participants">Número Máximo de Participantes</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                      <Input
                        id="max-participants"
                        type="number"
                        placeholder="Ex: 200"
                        className="bg-zinc-800 border-zinc-700 pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-size">Tamanho Máximo das Equipes</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                      <Input
                        id="team-size"
                        type="number"
                        placeholder="Ex: 5"
                        className="bg-zinc-800 border-zinc-700 pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registration-fee">Taxa de Inscrição (R$)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                    <Input
                      id="registration-fee"
                      type="number"
                      placeholder="Ex: 0 para gratuito"
                      className="bg-zinc-800 border-zinc-700 pl-10"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="is-featured" />
                  <Label htmlFor="is-featured">Destacar evento na página inicial</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-zinc-800 p-4">
                <Button variant="outline" className="border-zinc-700">
                  Voltar
                </Button>
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                  Próximo: Programação
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Programação do Evento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Dia 1</h3>
                    <Button variant="outline" size="sm" className="border-zinc-700">
                      <Plus className="h-4 w-4 mr-1.5" /> Adicionar Dia
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="activity-time-1">Horário</Label>
                          <Input
                            id="activity-time-1"
                            type="time"
                            defaultValue="09:00"
                            className="bg-zinc-800 border-zinc-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="activity-title-1">Atividade</Label>
                          <Input
                            id="activity-title-1"
                            defaultValue="Credenciamento"
                            className="bg-zinc-800 border-zinc-700"
                          />
                          <Input
                            placeholder="Descrição (opcional)"
                            defaultValue="Recepção e entrega de kits"
                            className="bg-zinc-800 border-zinc-700 mt-2"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="activity-time-2">Horário</Label>
                          <Input
                            id="activity-time-2"
                            type="time"
                            defaultValue="10:00"
                            className="bg-zinc-800 border-zinc-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="activity-title-2">Atividade</Label>
                          <Input
                            id="activity-title-2"
                            defaultValue="Cerimônia de abertura"
                            className="bg-zinc-800 border-zinc-700"
                          />
                          <Input
                            placeholder="Descrição (opcional)"
                            defaultValue="Apresentação dos desafios"
                            className="bg-zinc-800 border-zinc-700 mt-2"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full border-dashed border-zinc-700">
                      <Plus className="h-4 w-4 mr-1.5" /> Adicionar Atividade
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Dia 2</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="activity-time-3">Horário</Label>
                          <Input
                            id="activity-time-3"
                            type="time"
                            defaultValue="09:00"
                            className="bg-zinc-800 border-zinc-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="activity-title-3">Atividade</Label>
                          <Input
                            id="activity-title-3"
                            defaultValue="Mentorias"
                            className="bg-zinc-800 border-zinc-700"
                          />
                          <Input
                            placeholder="Descrição (opcional)"
                            defaultValue="Sessões com especialistas da indústria"
                            className="bg-zinc-800 border-zinc-700 mt-2"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full border-dashed border-zinc-700">
                      <Plus className="h-4 w-4 mr-1.5" /> Adicionar Atividade
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-zinc-800 p-4">
                <Button variant="outline" className="border-zinc-700">
                  Voltar
                </Button>
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                  Próximo: Prêmios
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="prizes" className="space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Prêmios e Recompensas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Prêmios Principais</h3>
                  <div className="space-y-3">
                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="prize-place-1">Colocação</Label>
                          <Input id="prize-place-1" defaultValue="1º Lugar" className="bg-zinc-800 border-zinc-700" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="prize-value-1">Valor/Descrição</Label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                              <Input
                                id="prize-value-1"
                                defaultValue="25000"
                                className="bg-zinc-800 border-zinc-700 pl-10"
                              />
                            </div>
                            <Input
                              placeholder="Descrição adicional"
                              defaultValue="+ Incubação do projeto"
                              className="bg-zinc-800 border-zinc-700 flex-1"
                            />
                          </div>
                        </div>
                        <div className="flex items-end">
                          <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="prize-place-2">Colocação</Label>
                          <Input id="prize-place-2" defaultValue="2º Lugar" className="bg-zinc-800 border-zinc-700" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="prize-value-2">Valor/Descrição</Label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                              <Input
                                id="prize-value-2"
                                defaultValue="15000"
                                className="bg-zinc-800 border-zinc-700 pl-10"
                              />
                            </div>
                            <Input
                              placeholder="Descrição adicional"
                              defaultValue="+ Mentoria especializada"
                              className="bg-zinc-800 border-zinc-700 flex-1"
                            />
                          </div>
                        </div>
                        <div className="flex items-end">
                          <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full border-dashed border-zinc-700">
                      <Plus className="h-4 w-4 mr-1.5" /> Adicionar Prêmio
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Categorias Especiais</h3>
                  <div className="space-y-3">
                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="special-category-1">Categoria</Label>
                          <Input
                            id="special-category-1"
                            defaultValue="Melhor Inovação em IA"
                            className="bg-zinc-800 border-zinc-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="special-prize-1">Prêmio</Label>
                          <Input
                            id="special-prize-1"
                            defaultValue="R$ 5.000 + Acesso a APIs premium"
                            className="bg-zinc-800 border-zinc-700"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full border-dashed border-zinc-700">
                      <Plus className="h-4 w-4 mr-1.5" /> Adicionar Categoria Especial
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificates">Certificados</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="certificates" defaultChecked />
                    <Label htmlFor="certificates">Emitir certificados para participantes</Label>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Switch id="nft-certificates" />
                    <Label htmlFor="nft-certificates">Emitir certificados como NFTs</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-zinc-800 p-4">
                <Button variant="outline" className="border-zinc-700">
                  Voltar
                </Button>
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                  <Link href="/dashboard/organizer" className="text-white">
                    Criar Evento
                  </Link>
                </Button>
              </CardFooter>
            </Card>
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
  )
}
