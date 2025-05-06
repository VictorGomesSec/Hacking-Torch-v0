"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "HackingTorch",
    siteDescription: "Plataforma de eventos tech como hackathons e ideathons",
    contactEmail: "contato@hackingtorch.com",
    maxTeamSize: "5",
    maxEventsPerOrganizer: "10",
  })

  const [emailSettings, setEmailSettings] = useState({
    enableEmails: true,
    welcomeEmailEnabled: true,
    eventReminderEnabled: true,
    welcomeEmailTemplate:
      "Olá {{name}},\n\nBem-vindo à plataforma HackingTorch! Estamos felizes em tê-lo conosco.\n\nAtenciosamente,\nEquipe HackingTorch",
    eventReminderTemplate:
      "Olá {{name}},\n\nLembramos que o evento {{event}} começará em breve!\n\nAtenciosamente,\nEquipe HackingTorch",
  })

  const [securitySettings, setSecuritySettings] = useState({
    requireEmailVerification: true,
    twoFactorAuthEnabled: false,
    passwordMinLength: "8",
    sessionTimeout: "7",
  })

  const { toast } = useToast()

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Configurações salvas",
      description: "As configurações gerais foram atualizadas com sucesso",
    })
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Configurações salvas",
      description: "As configurações de email foram atualizadas com sucesso",
    })
  }

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Configurações salvas",
      description: "As configurações de segurança foram atualizadas com sucesso",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações da Plataforma</h1>
        <p className="text-muted-foreground">Gerencie as configurações globais da plataforma HackingTorch</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Configure as informações básicas da plataforma</CardDescription>
            </CardHeader>
            <form onSubmit={handleGeneralSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nome do Site</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Descrição do Site</Label>
                  <Textarea
                    id="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de Contato</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxTeamSize">Tamanho Máximo de Equipe</Label>
                  <Input
                    id="maxTeamSize"
                    type="number"
                    value={generalSettings.maxTeamSize}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, maxTeamSize: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxEventsPerOrganizer">Máximo de Eventos por Organizador</Label>
                  <Input
                    id="maxEventsPerOrganizer"
                    type="number"
                    value={generalSettings.maxEventsPerOrganizer}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, maxEventsPerOrganizer: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Salvar Alterações</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Email</CardTitle>
              <CardDescription>Configure as notificações por email da plataforma</CardDescription>
            </CardHeader>
            <form onSubmit={handleEmailSubmit}>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableEmails">Habilitar Emails</Label>
                  <Switch
                    id="enableEmails"
                    checked={emailSettings.enableEmails}
                    onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, enableEmails: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="welcomeEmailEnabled">Email de Boas-vindas</Label>
                  <Switch
                    id="welcomeEmailEnabled"
                    checked={emailSettings.welcomeEmailEnabled}
                    onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, welcomeEmailEnabled: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="eventReminderEnabled">Lembrete de Eventos</Label>
                  <Switch
                    id="eventReminderEnabled"
                    checked={emailSettings.eventReminderEnabled}
                    onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, eventReminderEnabled: checked })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="welcomeEmailTemplate">Template de Email de Boas-vindas</Label>
                  <Textarea
                    id="welcomeEmailTemplate"
                    rows={5}
                    value={emailSettings.welcomeEmailTemplate}
                    onChange={(e) => setEmailSettings({ ...emailSettings, welcomeEmailTemplate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventReminderTemplate">Template de Lembrete de Evento</Label>
                  <Textarea
                    id="eventReminderTemplate"
                    rows={5}
                    value={emailSettings.eventReminderTemplate}
                    onChange={(e) => setEmailSettings({ ...emailSettings, eventReminderTemplate: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Salvar Alterações</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Configure as opções de segurança da plataforma</CardDescription>
            </CardHeader>
            <form onSubmit={handleSecuritySubmit}>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="requireEmailVerification">Verificação de Email Obrigatória</Label>
                  <Switch
                    id="requireEmailVerification"
                    checked={securitySettings.requireEmailVerification}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, requireEmailVerification: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="twoFactorAuthEnabled">Autenticação de Dois Fatores</Label>
                  <Switch
                    id="twoFactorAuthEnabled"
                    checked={securitySettings.twoFactorAuthEnabled}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, twoFactorAuthEnabled: checked })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Tamanho Mínimo de Senha</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, passwordMinLength: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Tempo de Expiração da Sessão (dias)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Salvar Alterações</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
