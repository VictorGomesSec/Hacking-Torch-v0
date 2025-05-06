import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAdminStats } from "@/lib/services/admin-service"
import { BarChart3, Users, Calendar, Award, Clock, CheckCircle } from "lucide-react"

export default async function AdminDashboard() {
  const stats = await getAdminStats()

  if (!stats) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-muted-foreground">Erro ao carregar estatísticas</p>
      </div>
    )
  }

  const statCards = [
    {
      title: "Total de Usuários",
      value: stats.totalUsers,
      description: "Usuários registrados na plataforma",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-500/10",
    },
    {
      title: "Total de Eventos",
      value: stats.totalEvents,
      description: "Eventos criados na plataforma",
      icon: <Calendar className="h-6 w-6 text-green-500" />,
      color: "bg-green-500/10",
    },
    {
      title: "Eventos Ativos",
      value: stats.activeEvents,
      description: "Eventos atualmente em andamento",
      icon: <CheckCircle className="h-6 w-6 text-emerald-500" />,
      color: "bg-emerald-500/10",
    },
    {
      title: "Eventos Pendentes",
      value: stats.pendingEvents,
      description: "Eventos aguardando aprovação",
      icon: <Clock className="h-6 w-6 text-yellow-500" />,
      color: "bg-yellow-500/10",
    },
    {
      title: "Total de Equipes",
      value: stats.totalTeams,
      description: "Equipes formadas em eventos",
      icon: <Users className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-500/10",
    },
    {
      title: "Total de Submissões",
      value: stats.totalSubmissions,
      description: "Projetos submetidos em eventos",
      icon: <Award className="h-6 w-6 text-pink-500" />,
      color: "bg-pink-500/10",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard de Administração</h1>
        <p className="text-muted-foreground">Visão geral e estatísticas da plataforma HackingTorch</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`rounded-full p-2 ${card.color}`}>{card.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Atividades dos últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="flex h-full items-center justify-center">
              <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
              <p className="ml-4 text-muted-foreground">Gráficos de atividade serão implementados em breve</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribuição de Usuários</CardTitle>
            <CardDescription>Por tipo de usuário</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="flex h-full items-center justify-center">
              <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
              <p className="ml-4 text-muted-foreground">Gráficos de distribuição serão implementados em breve</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
