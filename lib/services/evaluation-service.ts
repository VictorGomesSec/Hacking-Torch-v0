import { supabase } from "@/lib/supabase/client"

export type Evaluation = {
  id: string
  submission_id: string
  evaluator_id: string
  innovation_score: number
  execution_score: number
  impact_score: number
  presentation_score: number
  comments?: string
  created_at: string
  updated_at: string
}

export async function getEvaluationsBySubmission(submissionId: string) {
  const { data, error } = await supabase
    .from("project_evaluations")
    .select(`
      *,
      profiles (
        first_name,
        last_name,
        avatar_url
      )
    `)
    .eq("submission_id", submissionId)

  if (error) {
    console.error("Erro ao buscar avaliações:", error)
    return []
  }

  return data.map((evaluation) => ({
    ...evaluation,
    evaluator: evaluation.profiles,
  }))
}

export async function createEvaluation(evaluationData: Omit<Evaluation, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("project_evaluations").insert(evaluationData).select().single()

  return { evaluation: data, error }
}

export async function updateEvaluation(id: string, evaluationData: Partial<Evaluation>) {
  const { data, error } = await supabase
    .from("project_evaluations")
    .update(evaluationData)
    .eq("id", id)
    .select()
    .single()

  return { evaluation: data, error }
}

export async function getEvaluationStatsByEvent(eventId: string) {
  const { data: submissions, error: submissionsError } = await supabase
    .from("project_submissions")
    .select("id")
    .eq("event_id", eventId)

  if (submissionsError) {
    console.error("Erro ao buscar submissões para estatísticas:", submissionsError)
    return null
  }

  const submissionIds = submissions.map((s) => s.id)

  if (submissionIds.length === 0) {
    return { totalEvaluations: 0, averageScores: {} }
  }

  const { data: evaluations, error: evaluationsError } = await supabase
    .from("project_evaluations")
    .select("*")
    .in("submission_id", submissionIds)

  if (evaluationsError) {
    console.error("Erro ao buscar avaliações para estatísticas:", evaluationsError)
    return null
  }

  // Calcular médias
  const totalEvaluations = evaluations.length

  if (totalEvaluations === 0) {
    return { totalEvaluations: 0, averageScores: {} }
  }

  const sumScores = evaluations.reduce(
    (acc, evaluation) => {
      acc.innovation += evaluation.innovation_score
      acc.execution += evaluation.execution_score
      acc.impact += evaluation.impact_score
      acc.presentation += evaluation.presentation_score
      acc.total +=
        (evaluation.innovation_score +
          evaluation.execution_score +
          evaluation.impact_score +
          evaluation.presentation_score) /
        4
      return acc
    },
    { innovation: 0, execution: 0, impact: 0, presentation: 0, total: 0 },
  )

  const averageScores = {
    innovation: sumScores.innovation / totalEvaluations,
    execution: sumScores.execution / totalEvaluations,
    impact: sumScores.impact / totalEvaluations,
    presentation: sumScores.presentation / totalEvaluations,
    total: sumScores.total / totalEvaluations,
  }

  return { totalEvaluations, averageScores }
}
