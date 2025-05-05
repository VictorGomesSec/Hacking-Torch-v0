"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Flame,
  User,
  SettingsIcon,
  Bell,
  Shield,
  CreditCard,
  LogOut,
  Search,
  Lock,
  Mail,
  Smartphone,
  Globe,
  Trash2,
  Save,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

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
                  <SettingsIcon className="mr-2 h-4 w-4" />
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
            <h1 className="text-2xl font-bold">Configurações</h1>
            <p className="text-zinc-400">Gerencie suas preferências e configurações de conta</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-zinc-900/50 border-zinc-800 sticky top-24">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {[
                    { icon: <User className="h-4 w-4" />, label: "Perfil", id: "profile" },
                    { icon: <Bell className="h-4 w-4" />, label: "Notificações", id: "notifications" },
                    { icon: <Lock className="h-4 w-4" />, label: "Segurança", id: "security" },
                    { icon: <CreditCard className="h-4 w-4" />, label: "Pagamentos", id: "payments" },
                    { icon: <Shield className="h-4 w-4" />, label: "Privacidade", id: "privacy" },
                  ].map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={`w-full justify-start ${
                        activeTab === item.id ? "bg-zinc-800/70 text-orange-400" : ""
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </Button>
                  ))}
                  <Separator className="my-2 bg-zinc-800" />
                  <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300">
                    <LogOut className="h-4 w-4" />
                    <span className="ml-2">Sair</span>
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Informações do Perfil</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Atualize suas informações pessoais e como você aparece na plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <Avatar className="h-20 w-20 border-2 border-zinc-800">
                        <AvatarImage src="/placeholder.svg?height=80&width=80&text=JD" />
                        <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500 text-xl">
                          JD
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <div className="text-sm text-zinc-400">
                          Recomendado: JPG, PNG ou GIF. Tamanho máximo de 2MB.
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="border-zinc-700">
                            Alterar foto
                          </Button>
                          <Button variant="outline" className="border-zinc-700 text-red-400 hover:text-red-300">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">Nome</Label>
                        <Input id="first-name" defaultValue="João" className="bg-zinc-800 border-zinc-700" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Sobrenome</Label>
                        <Input id="last-name" defaultValue="Silva" className="bg-zinc-800 border-zinc-700" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                        <Input
                          id="email"
                          type="email"
                          defaultValue="joao.silva@email.com"
                          className="bg-zinc-800 border-zinc-700 pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                        <Input
                          id="phone"
                          type="tel"
                          defaultValue="+55 11 98765-4321"
                          className="bg-zinc-800 border-zinc-700 pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                        <Input
                          id="website"
                          type="url"
                          defaultValue="https://joaosilva.dev"
                          className="bg-zinc-800 border-zinc-700 pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        className="w-full h-24 bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white"
                        defaultValue="Desenvolvedor Frontend apaixonado por criar interfaces intuitivas e acessíveis. Especializado em React e TypeScript, com experiência em desenvolvimento de aplicações web modernas."
                      ></textarea>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-zinc-800 p-4">
                    <Button variant="outline" className="border-zinc-700">
                      Cancelar
                    </Button>
                    <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                      <Save className="h-4 w-4 mr-1.5" /> Salvar alterações
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Preferências</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Configure suas preferências de idioma e região
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Idioma</Label>
                        <select
                          id="language"
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white"
                          defaultValue="pt-BR"
                        >
                          <option value="pt-BR">Português (Brasil)</option>
                          <option value="en-US">English (US)</option>
                          <option value="es">Español</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Fuso horário</Label>
                        <select
                          id="timezone"
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white"
                          defaultValue="america-sao_paulo"
                        >
                          <option value="america-sao_paulo">America/Sao_Paulo (GMT-3)</option>
                          <option value="america-new_york">America/New_York (GMT-5)</option>
                          <option value="europe-london">Europe/London (GMT+0)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date-format">Formato de data</Label>
                      <select
                        id="date-format"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white"
                        defaultValue="dd-mm-yyyy"
                      >
                        <option value="dd-mm-yyyy">DD/MM/YYYY</option>
                        <option value="mm-dd-yyyy">MM/DD/YYYY</option>
                        <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t border-zinc-800 p-4">
                    <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                      Salvar preferências
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {activeTab === "notifications" && (
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Configure como e quando você deseja receber notificações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notificações por e-mail</h3>
                    <div className="space-y-3">
                      {[
                        { id: "email-events", label: "Novos eventos" },
                        { id: "email-teams", label: "Convites para times" },
                        { id: "email-submissions", label: "Prazos de submissão" },
                        { id: "email-results", label: "Resultados de eventos" },
                        { id: "email-marketing", label: "Novidades e promoções" },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <Label htmlFor={item.id} className="flex-1">
                            {item.label}
                          </Label>
                          <Switch id={item.id} defaultChecked={item.id !== "email-marketing"} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-zinc-800" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notificações no aplicativo</h3>
                    <div className="space-y-3">
                      {[
                        { id: "app-events", label: "Novos eventos" },
                        { id: "app-teams", label: "Convites para times" },
                        { id: "app-messages", label: "Mensagens" },
                        { id: "app-submissions", label: "Prazos de submissão" },
                        { id: "app-results", label: "Resultados de eventos" },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <Label htmlFor={item.id} className="flex-1">
                            {item.label}
                          </Label>
                          <Switch id={item.id} defaultChecked />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-zinc-800 p-4">
                  <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                    Salvar preferências
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "security" && (
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Gerencie sua senha e configurações de segurança
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Alterar senha</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Senha atual</Label>
                        <Input
                          id="current-password"
                          type="password"
                          placeholder="••••••••"
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nova senha</Label>
                        <Input
                          id="new-password"
                          type="password"
                          placeholder="••••••••"
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                      <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                        Atualizar senha
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "privacy" && (
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Privacidade</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Gerencie suas configurações de privacidade e dados pessoais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-red-400">Zona de perigo</h3>
                    <div className="space-y-3">
                      <div className="p-4 border border-red-900/50 bg-red-950/20 rounded-lg">
                        <h4 className="font-medium mb-2">Excluir conta</h4>
                        <p className="text-sm text-zinc-400 mb-4">
                          Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode
                          ser desfeita.
                        </p>
                        <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                          <Trash2 className="h-4 w-4 mr-1.5" /> Excluir minha conta
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
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
