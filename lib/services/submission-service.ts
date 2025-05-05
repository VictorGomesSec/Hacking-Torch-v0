import { supabase } from "@/lib/supabase/client"
import type { PostgrestError } from "@supabase/supabase-js"

export type ProjectSubmission = {
  id: string
  event_id: string
  team_id: string
  name: string
  short_description: string
  description: string
  repository_url?: string
  demo_url?: string
  video_url?: string
  status: "draft" | "submitted" | "evaluated"
  created_at: string
  updated_at: string
  images?: { id: string; image_url: string }[]
  files?: { id: string; file_name: string; file_url: string; file_size: number }[]
  categories?: string[]
}

export type SubmissionCreateInput = Omit<ProjectSubmission, "id" | "created_at" | "updated_at">

export async function getSubmissionsByEvent(eventId: string): Promise<ProjectSubmission[]> {
  try {
    const { data, error } = await supabase
      .from("project_submissions")
      .select(`
        *,
        teams (
          name
        ),
        project_images (
          id,
          image_url
        ),
        project_files (
          id,
          file_name,
          file_url,
          file_size
        ),
        submission_categories (
          category_id,
          categories (
            name
          )
        )
      `)
      .eq("event_id", eventId)

    if (error) {
      console.error("Erro ao buscar submissões:", error)
      return []
    }

    return data.map((submission) => {
      const categories = submission.submission_categories?.map((sc: any) => sc.categories.name) || []

      return {
        ...submission,
        team_name: submission.teams?.name,
        categories,
      }
    })
  } catch (error) {
    console.error("Erro inesperado ao buscar submissões:", error)
    return []
  }
}

export async function getSubmissionById(submissionId: string): Promise<ProjectSubmission | null> {
  try {
    const { data, error } = await supabase
      .from("project_submissions")
      .select(`
        *,
        teams (
          name,
          team_members (
            user_id,
            role,
            profiles (
              first_name,
              last_name,
              avatar_url
            )
          )
        ),
        project_images (
          id,
          image_url
        ),
        project_files (
          id,
          file_name,
          file_url,
          file_size
        ),
        submission_categories (
          category_id,
          categories (
            name
          )
        )
      `)
      .eq("id", submissionId)
      .single()

    if (error) {
      console.error("Erro ao buscar submissão:", error)
      return null
    }

    const categories = data.submission_categories?.map((sc: any) => sc.categories.name) || []

    return {
      ...data,
      team_name: data.teams?.name,
      team_members: data.teams?.team_members,
      categories,
    }
  } catch (error) {
    console.error("Erro inesperado ao buscar submissão:", error)
    return null
  }
}

export async function createSubmission(
  submissionData: SubmissionCreateInput,
): Promise<{ submission: ProjectSubmission | null; error: PostgrestError | null }> {
  try {
    const { images, files, categories, ...submission } = submissionData

    // Inserir a submissão
    const { data: newSubmissionData, error: submissionError } = await supabase
      .from("project_submissions")
      .insert(submission)
      .select()
      .single()

    if (submissionError) {
      console.error("Erro ao criar submissão:", submissionError)
      return { submission: null, error: submissionError }
    }

    // Se houver categorias, inserir as relações
    if (categories && categories.length > 0) {
      // Buscar IDs das categorias
      const { data: categoryData } = await supabase.from("categories").select("id, name").in("name", categories)

      if (categoryData && categoryData.length > 0) {
        const submissionCategories = categoryData.map((category) => ({
          submission_id: newSubmissionData.id,
          category_id: category.id,
        }))

        const { error: categoryError } = await supabase.from("submission_categories").insert(submissionCategories)

        if (categoryError) {
          console.error("Erro ao adicionar categorias à submissão:", categoryError)
        }
      }
    }

    return { submission: newSubmissionData, error: null }
  } catch (error) {
    console.error("Erro inesperado ao criar submissão:", error)
    return { submission: null, error: { message: "Erro interno do servidor" } as PostgrestError }
  }
}

export async function uploadSubmissionImage(
  submissionId: string,
  file: File,
): Promise<{ url: string | null; error: any }> {
  try {
    const fileExt = file.name.split(".").pop()
    const fileName = `${submissionId}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `submissions/${fileName}`

    const { error: uploadError } = await supabase.storage.from("projects").upload(filePath, file)

    if (uploadError) {
      console.error("Erro ao fazer upload da imagem:", uploadError)
      return { url: null, error: uploadError }
    }

    const { data: urlData } = supabase.storage.from("projects").getPublicUrl(filePath)

    const { error: insertError } = await supabase.from("project_images").insert({
      submission_id: submissionId,
      image_url: urlData.publicUrl,
    })

    if (insertError) {
      console.error("Erro ao salvar imagem na submissão:", insertError)
      return { url: null, error: insertError }
    }

    return { url: urlData.publicUrl, error: null }
  } catch (error) {
    console.error("Erro inesperado ao fazer upload de imagem:", error)
    return { url: null, error: { message: "Erro interno do servidor" } }
  }
}

export async function uploadSubmissionFile(
  submissionId: string,
  file: File,
): Promise<{ url: string | null; error: any }> {
  try {
    const fileName = file.name
    const filePath = `submissions/files/${submissionId}-${Math.random().toString(36).substring(2)}-${fileName}`

    const { error: uploadError } = await supabase.storage.from("projects").upload(filePath, file)

    if (uploadError) {
      console.error("Erro ao fazer upload do arquivo:", uploadError)
      return { url: null, error: uploadError }
    }

    const { data: urlData } = supabase.storage.from("projects").getPublicUrl(filePath)

    const { error: insertError } = await supabase.from("project_files").insert({
      submission_id: submissionId,
      file_name: fileName,
      file_url: urlData.publicUrl,
      file_size: file.size,
    })

    if (insertError) {
      console.error("Erro ao salvar arquivo na submissão:", insertError)
      return { url: null, error: insertError }
    }

    return { url: urlData.publicUrl, error: null }
  } catch (error) {
    console.error("Erro inesperado ao fazer upload de arquivo:", error)
    return { url: null, error: { message: "Erro interno do servidor" } }
  }
}
