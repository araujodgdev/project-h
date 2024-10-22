"use client"

import { useState } from "react"
import LoginForm from "@/components/LoginForm"
import Hero from "@/components/Hero"
import { useThemeStore } from "@/store/useThemeStore"

export default function Page() {
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const [step, setStep] = useState('email')

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
      <Hero />
      <LoginForm 
        handleSubmitCode={handleSubmitCode}
        handleSubmitEmail={handleSubmitEmail}
        setStep={setStep}
        step={step}
      />
    </div>
  )
}