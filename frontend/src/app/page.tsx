"use client"

import { useState } from "react"
import LoginForm from "@/components/LoginForm"
import Hero from "@/components/Hero"
import { useThemeStore } from "@/store/useThemeStore"
import axios from 'axios';
import { useRouter } from "next/navigation"
import RegisterForm from "@/components/RegisterForm"
import { useUserStore } from "@/store/useUserStore"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Page() {
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const setUserEmail = useUserStore(state => state.setUserEmail);
  const setUsername = useUserStore(state => state.setUsername);
  const setUserFullName = useUserStore(state => state.setUserFullName);
  const setUserId = useUserStore(state => state.setUserId);
  const userEmail = useUserStore(state => state.email);
  const [step, setStep] = useState('email')
  const router = useRouter();

  const handleSubmitEmail = async (formData: FormData): Promise<void> => {
    try {
      setUserEmail(formData.get('email') as string);
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
        email: userEmail,
        code: formData.get('code')
      })
      if (validCode) {
        const user = await axios.get(`http://localhost:8080/api/user/email?email=${userEmail}`);
        setUserFullName(user.data.fullName);
        setUsername(user.data.username);
        setUserId(user.data.id);
        localStorage.setItem('user', JSON.stringify(user.data));
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
        email: userEmail,
        username: formData.get('username')
      })

      const { fullName, username, id } = response.data;

      setUsername(username);
      setUserFullName(fullName);
      setUserId(id);

      await axios.post('http://localhost:8080/api/auth/request-code', {
        email: userEmail
      });

      setStep('code')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}