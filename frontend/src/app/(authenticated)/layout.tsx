'use client'

import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useThemeStore } from "@/store/useThemeStore";
import { menuItems } from "@/components/AppSidebar"
import { usePathname } from "next/navigation";


export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDarkMode = useThemeStore(s => s.isDarkMode);
  return (
    <SidebarProvider defaultOpen={true} className={`dark:bg-gray-900 lg:flex-row ${isDarkMode ? 'dark' : ''}`}>
      <AppSidebar className="" />
      <div className="flex flex-col items-center w-screen">
        <header className="sticky w-full text-center top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{menuItems.find(item => item.link == pathname)?.title}</h2>
        </header>
        <main className="dark:bg-gray-900 w-full">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )

}   