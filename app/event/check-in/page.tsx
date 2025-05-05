import Link from "next/link"
import { ArrowLeft, Calendar, Check, Clock, Flame, Info, MapPin, QrCode, Share2, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckInPage() {
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

      <div className="container mx-auto px-4 py-8 max-w-md">
        <Link href="/event/details" className="inline-flex items-center text-zinc-400 hover:text-white mb-4 text-sm">
          <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para detalhes do evento
        </Link>

        <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
          <div className="h-3 bg-gradient-to-r from-red-600 to-orange-500" />
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Check-in do Evento</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-zinc-800/50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Hackathon Future Tech</h3>
                  <div className="flex flex-wrap gap-2 items-center text-sm text-zinc-400 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>12-14 Jun, 2025</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>São Paulo, SP</span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-red-600 to-orange-500">Presencial</Badge>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-400" />
                </div>
                <span className="text-green-400">Inscrição confirmada</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-4">
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg mb-1">Seu QR Code de Check-in</h3>
                <p className="text-sm text-zinc-400">Apresente este QR code na entrada do evento</p>
              </div>

              <div className="bg-white p-4 rounded-lg mb-4">
                <div className="w-56 h-56 relative">
                  <QrCode className="w-full h-full text-black" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-white p-1">
                      <div className="h-full w-full rounded-full bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center">
                        <Flame className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-xl font-bold font-mono mb-1">#HT25-1234</div>
                <div className="text-sm text-zinc-400">ID do participante</div>
              </div>

              <div className="flex gap-2 w-full">
                <Button className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400">
                  <Ticket className="h-4 w-4 mr-2" />
                  <Link href="/event/team" className="text-white">
                    Adicionar à carteira
                  </Link>
                </Button>
                <Button variant="outline" className="border-zinc-700">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-orange-950/30 border border-orange-900/50 p-4 rounded-lg flex gap-3">
              <Info className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-orange-400 mb-1">Importante</p>
                <p className="text-zinc-300">
                  Após o check-in no evento, você poderá criar ou entrar em um time para participar do hackathon.
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t border-zinc-800 p-4">
            <div className="text-sm text-zinc-400">
              <Clock className="h-4 w-4 inline mr-1" /> Check-in abre às 08:00
            </div>
            <Link href="/event/team" className="text-sm font-medium text-orange-400 hover:text-orange-300">
              Gerenciar time →
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
