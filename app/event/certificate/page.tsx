import Link from "next/link"
import { ArrowLeft, Award, Calendar, Check, Download, Flame, QrCode, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function CertificatePage() {
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/event/submission" className="inline-flex items-center text-zinc-400 hover:text-white mb-4 text-sm">
          <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para submissão
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Certificado NFT</h1>
            <p className="text-zinc-400">Hackathon Future Tech</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-zinc-700">
              <Share2 className="h-4 w-4 mr-1.5" /> Compartilhar
            </Button>
            <Button variant="outline" size="sm" className="border-zinc-700">
              <Download className="h-4 w-4 mr-1.5" /> Download
            </Button>
          </div>
        </div>

        <Card className="bg-zinc-900/50 border-zinc-800 mb-6 overflow-hidden">
          <div className="h-3 bg-gradient-to-r from-red-600 to-orange-500" />
          <CardContent className="p-6">
            <div className="relative bg-gradient-to-br from-zinc-900 to-black p-6 rounded-lg border border-zinc-800 overflow-hidden">
              {/* Certificate Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-600/10 to-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-red-600/10 to-orange-500/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

              {/* Certificate Content */}
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <Flame className="h-6 w-6 text-orange-500" />
                    <span className="font-bold text-xl bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                      HackingTorch
                    </span>
                  </div>
                  <Badge className="bg-gradient-to-r from-red-600 to-orange-500">NFT Certificado</Badge>
                </div>

                <div className="text-center mb-6">
                  <Award className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-1">Certificado de Participação</h2>
                  <p className="text-zinc-400">Este certificado confirma que</p>
                </div>

                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-20 w-20 border-4 border-orange-500/20 mb-3">
                    <AvatarImage src="/placeholder.svg?height=80&width=80&text=JD" />
                    <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500 text-xl">JD</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold mb-1">João Silva</h3>
                  <p className="text-zinc-400 mb-2">
                    como membro do time <span className="font-medium text-white">Team Innovators</span>
                  </p>
                  <p className="text-zinc-400 text-sm">participou e concluiu com sucesso o</p>
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold mb-1">Hackathon Future Tech 2025</h2>
                  <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">
                    <Calendar className="h-4 w-4" />
                    <span>12-14 de Junho, 2025</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="bg-zinc-800/80 p-3 rounded-lg">
                    <QrCode className="h-16 w-16 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm mb-1">ID do Certificado</div>
                    <div className="font-mono text-orange-400">#NFT-HT25-1234-ABCD</div>
                    <div className="text-xs text-zinc-500 mt-1">Verificável na blockchain</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t border-zinc-800 p-4">
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-zinc-400">Status: </span>
                  <span className="text-green-400 font-medium">Verificado</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">Autenticidade confirmada</span>
                </div>
              </div>

              <div className="bg-zinc-800/50 p-3 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Award className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="font-medium">Adicionar à carteira blockchain</div>
                    <div className="text-xs text-zinc-400">Armazene seu certificado como NFT</div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400"
                >
                  <Link href="/" className="text-white">
                    Conectar
                  </Link>
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>

        <div className="flex justify-between">
          <Link href="/event/submission" className="text-sm text-zinc-400 hover:text-white">
            ← Voltar para submissão
          </Link>
          <Link href="/" className="text-sm text-orange-400 hover:text-orange-300">
            Explorar mais eventos →
          </Link>
        </div>
      </div>
    </div>
  )
}
