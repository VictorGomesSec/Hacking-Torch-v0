import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, PlusCircle } from "lucide-react"

export const metadata = {
  title: "Gerenciar Eventos | HackingTorch Admin",
  description: "Gerencie os eventos da plataforma HackingTorch",
}

async function getEvents() {
  const supabase = createServerSupabaseClient()

  const { data: events, error } = await supabase
    .from("events")
    .select(`
      id,
      title,
      description,
      start_date,
      end_date,
      location,
      status,
      created_at,
      organizer_id,
      profiles(first_name, last_name)
    `)
    .order("created_at", { ascending: false })
    .limit(100)

  if (error) {
    console.error("Erro ao buscar eventos:", error)
    return []
  }

  return events || []
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Eventos</h1>
          <p className="text-muted-foreground">Gerencie os eventos da plataforma HackingTorch.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Criar Evento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Eventos</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar eventos..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Organizador</TableHead>
                <TableHead>Data de Início</TableHead>
                <TableHead>Data de Término</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>
                    {event.profiles?.first_name} {event.profiles?.last_name}
                  </TableCell>
                  <TableCell>{new Date(event.start_date).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>{new Date(event.end_date).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        event.status === "active"
                          ? "bg-green-100 text-green-800"
                          : event.status === "upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {event.status === "active" ? "Ativo" : event.status === "upcoming" ? "Em breve" : "Encerrado"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Editar evento</DropdownMenuItem>
                        <DropdownMenuItem>Gerenciar equipes</DropdownMenuItem>
                        <DropdownMenuItem>Gerenciar submissões</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Excluir evento</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
