"use client"

import * as React from "react"
import {
  Moon,
  Sun,
  Home, Bell, Mail, User,
  LogOut
} from "lucide-react"

import { Switch } from "./ui/switch"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useThemeStore } from "@/store/useThemeStore"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import { poppins } from "@/lib/fonts"

export const menuItems = [
  {
    title: "Início",
    icon: Home,
    link: "/home"
  },
  {
    title: "Notificações",
    icon: Bell,
    link: "/notifications"
  },
  {
    title: "Mensagens",
    icon: Mail,
    link: "/messages"
  },
  {
    title: "Perfil",
    icon: User,
    link: "/profile"
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <Sidebar collapsible="none" {...props} className="sticky top-0 bg-inherit w-[28rem] px-20 min-h-screen border-r dark:border-gray-800 dark:bg-gray-900">
      <SidebarHeader className="relative left-2"> 
            <h1 className={`mt-6 font-bold text-3xl text-orange-600 dark:text-opacity-90 ${poppins.className}`}>
              PROJECT H
            </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="mt-8">
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col items-start gap-4">
              {menuItems.map(item => (
                <SidebarMenuItem key={item.title} className="w-full">
                  <SidebarMenuButton asChild className="dark:hover:bg-orange-600 py-4 hover:bg-opacity-90 text-lg font-semibold">
                    <Link href={item.link}>
                      <item.icon className=""/>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-4">
          <SidebarGroupContent>
            <div className="flex items-center ml-2 space-x-2">
              <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                aria-label="Toggle dark mode"
              />
              <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt='imagem do usuário' />
            <AvatarFallback className="rounded-lg dark:bg-orange-600">{`${user.fullName?.split(' ')[0][0]}${user.fullName?.split(' ')[1][0]}`}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.fullName}</span>
            <span className="truncate text-xs">{user.username}</span>
          </div>
          <LogOut className="ml-auto size-4 relative left-16" />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
