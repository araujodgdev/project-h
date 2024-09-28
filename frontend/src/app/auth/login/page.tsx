"use client"

import { useState } from "react"
import { Moon, Sun, AtSign, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [step, setStep] = useState('email')

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para enviar o código ao email
    setStep('code')
  }

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para verificar o código
    console.log("Código verificado")
  }

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row ${isDarkMode ? 'dark' : ''}`}>
      {/* Hero Section */}
      <div className="lg:flex-1 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 dark:from-orange-600 dark:via-orange-700 dark:to-orange-800 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-orange-600/50 dark:to-orange-800/50"></div>
        <div className="relative max-w-2xl text-center lg:text-left z-10">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Conecte-se ao <span className="text-orange-200">Project H</span>
          </h1>
          <p className="text-xl text-white opacity-90 mb-8">
            Sua plataforma exclusiva para compartilhar ideias e colaborar com colegas da universidade.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <div className="bg-white/20 backdrop-blur-lg rounded-full px-6 py-2 text-white">
              #ConexãoUniversitária
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-full px-6 py-2 text-white">
              #InovaçãoAcadêmica
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="lg:flex-1 bg-white dark:bg-gray-900 p-8 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Login</h2>
            <div className="flex items-center space-x-2">
              <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                aria-label="Toggle dark mode"
              />
              <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
          </div>

          {step === 'email' ? (
            <form onSubmit={handleSubmitEmail} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  E-mail Institucional
                </Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@cesar.school"
                    required
                    className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center">
                Enviar Código
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmitCode} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Código de Acesso
                </Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Digite o código recebido"
                  required
                  className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center">
                Entrar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button variant="link" onClick={() => setStep('email')} className="w-full text-orange-500">
                Voltar para e-mail
              </Button>
            </form>
          )}

          <div className="text-sm text-center">
            <a href="#" className="text-orange-500 hover:underline">
              Precisa de ajuda?
            </a>
          </div>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Ao fazer login, você concorda com nossos{" "}
            <a href="#" className="text-orange-500 hover:underline font-medium">
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a href="#" className="text-orange-500 hover:underline font-medium">
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}