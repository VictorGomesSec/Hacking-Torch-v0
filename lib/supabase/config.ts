// Configuração centralizada do Supabase
export const supabaseConfig = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",

  // Função para verificar se a configuração é válida
  isValid: () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      console.error("Variáveis de ambiente do Supabase não estão definidas")
      return false
    }

    // Verificar se a URL é válida
    try {
      new URL(url)
    } catch (e) {
      console.error("URL do Supabase inválida:", url)
      return false
    }

    return true
  },
}
