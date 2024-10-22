"use client"

import { useState } from "react"
import LoginForm from "@/components/LoginForm"
import Hero from "@/components/Hero"
import { useThemeStore } from "@/store/useThemeStore"
import axios from 'axios';

export default function Page() {
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const [step, setStep] = useState('email')

  const handleSubmitEmail = async (formData: FormData): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/request-code', {
        email: formData.get('email')
      })
      console.log(response)
      setStep('code')
    } catch (error) {
      console.log(error)
    }
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