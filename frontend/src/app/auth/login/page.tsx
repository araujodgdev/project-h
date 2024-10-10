"use client"

import { useState } from "react"
import LoginForm from "@/components/LoginForm"
import Hero from "@/components/Hero"

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
      <Hero />
      <LoginForm 
        handleSubmitCode={handleSubmitCode}
        handleSubmitEmail={handleSubmitEmail}
        isDarkMode={isDarkMode}
        setStep={setStep}
        step={step}
        toggleDarkMode={toggleDarkMode}
      />
    </div>
  )
}