"use client"

import { useState } from "react"
import LoginForm from "@/components/LoginForm"
import Hero from "@/components/Hero"
import { useThemeStore } from "@/store/useThemeStore"
import axios from 'axios';
import { useRouter } from "next/navigation"
import RegisterForm from "@/components/RegisterForm"

export default function Page() {
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const [step, setStep] = useState('email')
  const router = useRouter();

  const handleSubmitEmail = async (formData: FormData): Promise<void> => {
    localStorage.setItem('email', formData.get('email') as string)
    try {
      await axios.post('http://localhost:8080/api/auth/request-code', {
        email: formData.get('email')
      })
      setStep('code')
    } catch (error) {
      console.log(error)
      setStep('register')
    }
  }

  const handleSubmitCode = async (formData: FormData) => {
    try {
      const validCode = await axios.post('http://localhost:8080/api/auth/verify-code', {
        email: localStorage.getItem('email'),
        code: formData.get('code')
      })
      if (validCode) {
        router.push('/home');
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitRegister = async (formData: FormData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/user', {
        fullName: formData.get('name'),
        email: localStorage.getItem('email'),
        username: formData.get('username')
      })

      const {fullName, username} = response.data;

      localStorage.setItem('username', username as string)
      localStorage.setItem('name', fullName as string)

      await axios.post('http://localhost:8080/api/auth/request-code', {
        email: localStorage.getItem('email')
      });

      setStep('code')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row ${isDarkMode ? 'dark' : ''}`}>
      <Hero />
      {step === 'register' ?
        <RegisterForm
          handleSubmitRegister={handleSubmitRegister}
          setStep={setStep}
        /> :
        <LoginForm
          handleSubmitCode={handleSubmitCode}
          handleSubmitEmail={handleSubmitEmail}
          setStep={setStep}
          step={step}
        />}
    </div>
  )
}