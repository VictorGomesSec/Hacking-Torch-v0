import Link from "next/link"
import { Search, MapPin, Calendar, Filter, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HomePage() {
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
              <Link href="/event/details">Explorar</Link>
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Link href="/">Criar Evento</Link>
            </Button>
            <Avatar className="h-8 w-8 border border-zinc-700 hover:border-orange-500 transition-colors">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-orange-900/20" />
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-0">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              Descubra os melhores eventos tech
            </h1>
            <p className="text-zinc-400 text-lg mb-8">
              Hackathons, ideathons e eventos de tecnologia para impulsionar sua carreira
            </p>
            <div className="relative max-w-xl mx-auto">
              <Input
                placeholder="Buscar eventos..."
                className="bg-zinc-900/80 border-zinc-800 pl-10 h-12 rounded-full text-white"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />
              <Button className="absolute right-1 top-1 rounded-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                <Link href="/event/details" className="text-white">
                  Buscar
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Button variant="outline" size="sm" className="rounded-full border-zinc-700 text-zinc-400 flex gap-1.5">
              <MapPin className="h-4 w-4" /> Localização
            </Button>
            <Button variant="outline" size="sm" className="rounded-full border-zinc-700 text-zinc-400 flex gap-1.5">
              <Calendar className="h-4 w-4" /> Data
            </Button>
            <Button variant="outline" size="sm" className="rounded-full border-zinc-700 text-zinc-400 flex gap-1.5">
              <Filter className="h-4 w-4" /> Filtros
            </Button>
            <Badge className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white">
              Populares
            </Badge>
            <Badge variant="outline" className="border-zinc-700 text-zinc-400">
              Hackathons
            </Badge>
            <Badge variant="outline" className="border-zinc-700 text-zinc-400">
              Ideathons
            </Badge>
            <Badge variant="outline" className="border-zinc-700 text-zinc-400">
              Workshops
            </Badge>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="container mx-auto px-4 py-8">
        <Tabs defaultValue="upcoming" className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Eventos em destaque</h2>
            <TabsList className="bg-zinc-900/50">
              <TabsTrigger value="upcoming">Próximos</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="past">Passados</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
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
          </TabsContent>

          <TabsContent value="trending" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Similar content structure as "upcoming" tab */}
              <div className="flex justify-center items-center p-12 text-zinc-500">Conteúdo da aba Trending</div>
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Similar content structure as "upcoming" tab */}
              <div className="flex justify-center items-center p-12 text-zinc-500">Conteúdo da aba Passados</div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
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
