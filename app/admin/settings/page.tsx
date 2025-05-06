import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export const metadata = {
  title: "Configurações | HackingTorch Admin",
  description: "Configurações da plataforma HackingTorch",
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações da Plataforma</h1>
        <p className="text-muted-foreground">Gerencie as configurações da plataforma HackingTorch.</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Plataforma</CardTitle>
              <CardDescription>Configure as informações básicas da plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Nome da Plataforma</Label>
                <Input id="platform-name" defaultValue="HackingTorch" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform-description">Descrição da Plataforma</Label>
                <Textarea
                  id="platform-description"
                  defaultValue="Plataforma para organização e participação em hackathons e eventos de tecnologia."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email de Contato</Label>
                <Input id="contact-email" type="email" defaultValue="contato@hackingtorch.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações de Funcionalidades</CardTitle>
              <CardDescription>Ative ou desative funcionalidades da plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="registration">Registro de Usuários</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir que novos usuários se registrem na plataforma.
                  </p>
                </div>
                <Switch id="registration" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="event-creation">Criação de Eventos</Label>
                  <p className="text-sm text-muted-foreground">Permitir que organizadores criem novos eventos.</p>
                </div>
                <Switch id="event-creation" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="team-formation">Formação de Equipes</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir que participantes formem equipes para eventos.
                  </p>
                </div>
                <Switch id="team-formation" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="blockchain">Integração com Blockchain</Label>
                  <p className="text-sm text-muted-foreground">Ativar recursos de integração com blockchain.</p>
                </div>
                <Switch id="blockchain" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Email</CardTitle>
              <CardDescription>Configure as configurações de envio de email da plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">Servidor SMTP</Label>
                <Input id="smtp-host" defaultValue="smtp.example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">Porta SMTP</Label>
                <Input id="smtp-port" defaultValue="587" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-user">Usuário SMTP</Label>
                <Input id="smtp-user" defaultValue="no-reply@hackingtorch.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">Senha SMTP</Label>
                <Input id="smtp-password" type="password" defaultValue="********" />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="smtp-secure" defaultChecked />
                <Label htmlFor="smtp-secure">Usar conexão segura (SSL/TLS)</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Configurações</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Templates de Email</CardTitle>
              <CardDescription>Configure os templates de email enviados pela plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcome-email">Email de Boas-vindas</Label>
                <Textarea
                  id="welcome-email"
                  className="min-h-[200px]"
                  defaultValue="Olá {{nome}},\n\nBem-vindo à plataforma HackingTorch!\n\nEstamos felizes em tê-lo conosco. Comece a explorar os eventos disponíveis e participe de hackathons incríveis.\n\nAtenciosamente,\nEquipe HackingTorch"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Template</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Configure as políticas de segurança da plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">
                    Exigir autenticação de dois fatores para todos os usuários.
                  </p>
                </div>
                <Switch id="two-factor" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="password-expiry">Expiração de Senha</Label>
                  <p className="text-sm text-muted-foreground">
                    Exigir que os usuários alterem suas senhas periodicamente.
                  </p>
                </div>
                <Switch id="password-expiry" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-policy">Política de Senha</Label>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Switch id="min-length" defaultChecked />
                    <Label htmlFor="min-length">Mínimo de 8 caracteres</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="uppercase" defaultChecked />
                    <Label htmlFor="uppercase">Pelo menos uma letra maiúscula</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="number" defaultChecked />
                    <Label htmlFor="number">Pelo menos um número</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="special" defaultChecked />
                    <Label htmlFor="special">Pelo menos um caractere especial</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Configurações de Segurança</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logs de Auditoria</CardTitle>
              <CardDescription>Configure as políticas de logs de auditoria.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="audit-logs">Ativar Logs de Auditoria</Label>
                  <p className="text-sm text-muted-foreground">
                    Registrar todas as ações administrativas na plataforma.
                  </p>
                </div>
                <Switch id="audit-logs" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="log-retention">Período de Retenção de Logs</Label>
                <select
                  id="log-retention"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="30">30 dias</option>
                  <option value="60">60 dias</option>
                  <option value="90" selected>
                    90 dias
                  </option>
                  <option value="180">180 dias</option>
                  <option value="365">1 ano</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Configurações de Logs</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
