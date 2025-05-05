"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  Flame,
  User,
  Settings,
  Bell,
  LogOut,
  Search,
  ArrowLeft,
  Star,
  Award,
  Lightbulb,
  Code,
  Presentation,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
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
import { getSubmissionById } from "@/lib/services/submission-service"
import { createEvaluation } from "@/lib/services/evaluation-service"
import { useToast } from "@/hooks/use-toast"

export default function EventEvaluationPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const submissionId = searchParams.get("id")

  const [submission, setSubmission] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Scores
  const [innovationScore, setInnovationScore] = useState(5)
  const [executionScore, setExecutionScore] = useState(5)
  const [impactScore, setImpactScore] = useState(5)
  const [presentationScore, setPresentationScore] = useState(5)
  const [comments, setComments] = useState("")

  useEffect(() => {
    const fetchSubmission = async () => {
      if (!submissionId) return

      try {
        const submissionData = await getSubmissionById(submissionId)
        setSubmission(submissionData)
      } catch (error) {
        console.error("Erro ao buscar submissão:", error)
        toast({
          title: "Erro ao carregar submissão",
          description: "Não foi possível carregar os detalhes da submissão. Tente novamente mais tarde.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSubmission()
  }, [submissionId, toast])

  const handleSubmitEvaluation = async () => {
    if (!user || !submissionId) return

    setSubmitting(true)

    try {
      const evaluationData = {
        submission_id: submissionId,
        evaluator_id: user.id,
        innovation_score: innovationScore,
        execution_score: executionScore,
        impact_score: impactScore,
        presentation_score: presentationScore,
        comments: comments,
      }

      const { error } = await createEvaluation(evaluationData)

      if (error) {
        toast({
          title: "Erro ao enviar avaliação",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Avaliação enviada com sucesso",
          description: "Obrigado por avaliar este projeto!",
        })
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar avaliação",
        description: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const renderStars = (score: number, setScore: (score: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setScore(star)}
            className={`text-2xl ${
              star <= score ? "text-orange-400" : "text-zinc-600"
            } hover:text-orange-300 transition-colors`}
          >
            <Star className="h-6 w-6" fill={star <= score ? "currentColor" : "none"} />
          </button>
        ))}
      </div>
    )
  }

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
            <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para dashboard
          </Link>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : !submission ? (
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                <Award className="h-12 w-12 text-zinc-600 mb-4" />
                <h3 className="text-xl font-medium mb-2">Submissão não encontrada</h3>
                <p className="text-zinc-400 mb-6">A submissão que você está procurando não existe ou foi removida.</p>
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                  <Link href="/dashboard/organizer">Voltar para Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                  <h1 className="text-2xl font-bold">Avaliação de Projeto</h1>
                  <p className="text-zinc-400">Avalie o projeto com base nos critérios abaixo</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                  <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                      <CardTitle>Detalhes do Projeto</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-bold text-lg">{submission.name}</h3>
                        <p className="text-zinc-400 text-sm">{submission.short_description}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {submission.categories?.map((category: string) => (
                          <Badge key={category} variant="outline" className="border-orange-500/50 text-orange-400">
                            {category}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Time</h4>
                        <div className="flex -space-x-2">
                          {submission.team_members?.map((member: any) => (
                            <Avatar key={member.user_id} className="border-2 border-zinc-900 h-8 w-8">
                              <AvatarImage
                                src={
                                  member.profile?.avatar_url ||
                                  `/placeholder.svg?height=32&width=32&text=${member.profile?.first_name?.charAt(0) || ""}${member.profile?.last_name?.charAt(0) || ""}`
                                }
                              />
                              <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500 text-xs">
                                {member.profile?.first_name?.charAt(0) || ""}
                                {member.profile?.last_name?.charAt(0) || ""}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <div className="text-sm text-zinc-400">{submission.team_name}</div>
                      </div>

                      {submission.repository_url && (
                        <div className="space-y-1">
                          <h4 className="font-medium">Repositório</h4>
                          <a
                            href={submission.repository_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-orange-400 hover:text-orange-300 break-all"
                          >
                            {submission.repository_url}
                          </a>
                        </div>
                      )}

                      {submission.demo_url && (
                        <div className="space-y-1">
                          <h4 className="font-medium">Demo</h4>
                          <a
                            href={submission.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-orange-400 hover:text-orange-300 break-all"
                          >
                            {submission.demo_url}
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {submission.images && submission.images.length > 0 && (
                    <Card className="bg-zinc-900/50 border-zinc-800">
                      <CardHeader>
                        <CardTitle>Imagens do Projeto</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                          {submission.images.map((image: any) => (
                            <div key={image.id} className="relative aspect-video rounded-md overflow-hidden">
                              <img
                                src={image.image_url || "/placeholder.svg"}
                                alt="Imagem do projeto"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                      <CardTitle>Critérios de Avaliação</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <Lightbulb className="h-5 w-5 text-orange-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">Inovação</h3>
                            <p className="text-sm text-zinc-400">
                              Originalidade da ideia e abordagem inovadora para resolver o problema
                            </p>
                          </div>
                        </div>
                        <div className="pl-12">{renderStars(innovationScore, setInnovationScore)}</div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <Code className="h-5 w-5 text-orange-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">Execução</h3>
                            <p className="text-sm text-zinc-400">
                              Qualidade técnica, implementação e funcionalidade do projeto
                            </p>
                          </div>
                        </div>
                        <div className="pl-12">{renderStars(executionScore, setExecutionScore)}</div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <Award className="h-5 w-5 text-orange-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">Impacto</h3>
                            <p className="text-sm text-zinc-400">
                              Potencial de impacto e relevância da solução para o problema proposto
                            </p>
                          </div>
                        </div>
                        <div className="pl-12">{renderStars(impactScore, setImpactScore)}</div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <Presentation className="h-5 w-5 text-orange-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">Apresentação</h3>
                            <p className="text-sm text-zinc-400">
                              Clareza na comunicação da ideia, qualidade visual e documentação
                            </p>
                          </div>
                        </div>
                        <div className="pl-12">{renderStars(presentationScore, setPresentationScore)}</div>
                      </div>

                      <div className="space-y-3 pt-4">
                        <h3 className="font-medium">Comentários e Feedback</h3>
                        <Textarea
                          placeholder="Deixe seus comentários e feedback para o time..."
                          className="min-h-32 bg-zinc-800 border-zinc-700"
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                        />
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400"
                        onClick={handleSubmitEvaluation}
                        disabled={submitting}
                      >
                        {submitting ? "Enviando avaliação..." : "Enviar Avaliação"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
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
