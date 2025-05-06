"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ChevronLeft, ChevronRight, MoreHorizontal, Search, Clock, Trash2, Eye } from "lucide-react"
import { getAllEvents, updateEventStatus, deleteEvent } from "@/lib/services/admin-service"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [totalEvents, setTotalEvents] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [filter, setFilter] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<"active" | "pending" | "rejected" | "completed">("active")
  const { toast } = useToast()

  const fetchEvents = async () => {
    setIsLoading(true)
    try {
      const { events, count } = await getAllEvents(page, limit, filter)
      setEvents(events)
      setTotalEvents(count)
    } catch (error) {
      console.error("Erro ao buscar eventos:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os eventos",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [page, filter])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchEvents()
  }

  const handleUpdateStatus = async () => {
    if (!selectedEvent) return

    try {
      const { success, error } = await updateEventStatus(selectedEvent.id, newStatus)

      if (success) {
        toast({
          title: "Sucesso",
          description: "Status do evento atualizado com sucesso",
        })
        fetchEvents()
      } else {
        toast({
          title: "Erro",
          description: `Não foi possível atualizar o status: ${error?.message}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o status",
        variant: "destructive",
      })
    } finally {
      setIsStatusDialogOpen(false)
    }
  }

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return

    try {
      const { success, error } = await deleteEvent(selectedEvent.id)

      if (success) {
        toast({
          title: "Sucesso",
          description: "Evento excluído com sucesso",
        })
        fetchEvents()
      } else {
        toast({
          title: "Erro",
          description: `Não foi possível excluir o evento: ${error?.message}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao excluir o evento",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
    }
  }

  const openStatusDialog = (event: any) => {
    setSelectedEvent(event)
    setNewStatus(event.status)
    setIsStatusDialogOpen(true)
  }

  const openDeleteDialog = (event: any) => {
    setSelectedEvent(event)
    setIsDeleteDialogOpen(true)
  }

  const totalPages = Math.ceil(totalEvents / limit)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Ativo</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pendente</Badge>
      case "rejected":
        return <Badge className="bg-red-500">Rejeitado</Badge>
      case "completed":
        return <Badge className="bg-blue-500">Concluído</Badge>
      default:
        return <Badge className="bg-gray-500">Desconhecido</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gerenciamento de Eventos</h1>
        <p className="text-muted-foreground">Gerencie todos os eventos da plataforma HackingTorch</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="mb-6 flex items-center gap-2">
            <Input
              placeholder="Buscar por nome ou descrição..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="max-w-sm"
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
          </form>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Evento</TableHead>
                  <TableHead>Organizador</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Início</TableHead>
                  <TableHead>Data de Término</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Carregando eventos...
                    </TableCell>
                  </TableRow>
                ) : events.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Nenhum evento encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{event.name}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-xs">{event.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {event.profiles?.first_name} {event.profiles?.last_name}
                      </TableCell>
                      <TableCell>{getStatusBadge(event.status)}</TableCell>
                      <TableCell>{new Date(event.start_date).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>{new Date(event.end_date).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/event/details?id=${event.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Ver Detalhes</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openStatusDialog(event)}>
                              <Clock className="mr-2 h-4 w-4" />
                              <span>Alterar Status</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDeleteDialog(event)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Excluir Evento</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando {events.length} de {totalEvents} eventos
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Página {page} de {totalPages || 1}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
                disabled={page >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar Status do Evento</DialogTitle>
            <DialogDescription>Altere o status do evento {selectedEvent?.name}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={newStatus} onValueChange={(value: any) => setNewStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="rejected">Rejeitado</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateStatus}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Evento</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o evento {selectedEvent?.name}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEvent} className="bg-red-500 hover:bg-red-600">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
