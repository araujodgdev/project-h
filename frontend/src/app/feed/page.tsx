"use client"

import { useState } from "react"
import { Moon, Sun, Home, Bell, Mail, User, Search, MoreHorizontal, Heart, MessageCircle, Repeat2, Share, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function FeedPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const NavContent = () => (
    <nav className="space-y-4">
      <Button variant="ghost" className="w-full justify-start text-gray-800 dark:text-gray-200">
        <Home className="mr-2 h-4 w-4" />
        Início
      </Button>
      <Button variant="ghost" className="w-full justify-start text-gray-800 dark:text-gray-200">
        <Bell className="mr-2 h-4 w-4" />
        Notificações
      </Button>
      <Button variant="ghost" className="w-full justify-start text-gray-800 dark:text-gray-200">
        <Mail className="mr-2 h-4 w-4" />
        Mensagens
      </Button>
      <Button variant="ghost" className="w-full justify-start text-gray-800 dark:text-gray-200">
        <User className="mr-2 h-4 w-4" />
        Perfil
      </Button>
    </nav>
  )

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto flex">
        {/* Sidebar for desktop */}
        <aside className="w-64 hidden lg:block p-4">
          <div className="fixed">
            <h1 className="text-2xl font-bold text-orange-500 mb-8">Project H</h1>
            <NavContent />
            <div className="mt-8 flex items-center space-x-2">
              <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                aria-label="Toggle dark mode"
              />
              <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 border-x border-gray-200 dark:border-gray-800">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Início</h2>
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-gray-800 dark:text-gray-200">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <h2 className="text-2xl font-bold text-orange-500 mb-8">Project H</h2>
                <NavContent />
                <div className="mt-8 flex items-center space-x-2">
                  <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={toggleDarkMode}
                    aria-label="Toggle dark mode"
                  />
                  <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
              </SheetContent>
            </Sheet>
          </header>

          {/* Post Form */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@username" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  placeholder="O que está acontecendo na universidade?"
                  className="mb-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Postar</Button>
              </div>
            </div>
          </div>

          {/* Feed */}
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-4">
                <div className="flex space-x-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=User${i+1}`} alt={`@user${i+1}`} />
                    <AvatarFallback>{`U${i+1}`}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Usuário {i+1}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">@user{i+1}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">· 2h</span>
                    </div>
                    <p className="mt-2 text-gray-800 dark:text-gray-200">Este é um post de exemplo para o Project H. Estamos criando uma comunidade universitária incrível!</p>
                    <div className="mt-4 flex space-x-4">
                      <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                        <Heart className="mr-2 h-4 w-4" />
                        50
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        20
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                        <Repeat2 className="mr-2 h-4 w-4" />
                        10
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                        <Share className="mr-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 hidden xl:block p-4">
          <div className="fixed w-72">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Pesquisar</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar no Project H"
                  className="pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Tendências na sua universidade</h3>
              <ul className="space-y-4">
                {['Semana Acadêmica', 'Pesquisa Inovadora', 'Hackathon 2024', 'Palestra AI'].map((trend, i) => (
                  <li key={i}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{trend}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">210 posts</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}