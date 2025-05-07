import { Loader2 } from "lucide-react"

export default function RegisterLoading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 text-orange-500 animate-spin" />
        <p className="text-xl font-medium">Carregando...</p>
      </div>
    </div>
  )
}
