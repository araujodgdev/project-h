import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Sun, Moon, AtSign, ArrowRight, Ellipsis, UserRound } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { Dispatch, SetStateAction } from "react";
import { useThemeStore } from "@/store/useThemeStore";
import { useFormStatus } from "react-dom";
import Form from 'next/form'

const RegisterButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full bg-orange-500 aria-disabled:bg-gray-600 hover:bg-orange-600 text-white flex items-center justify-center" aria-disabled={pending} disabled={pending}>
            {pending ? 'Cadastrando' : 'Cadastrar'}
            {pending ? <Ellipsis className="ml-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
        </Button>
    )
}

export default function RegisterForm({ handleSubmitRegister, setStep }: {
    handleSubmitRegister: (formData: FormData) => void | Promise<void>, setStep: Dispatch<SetStateAction<string>>
}) {
    const isDarkMode = useThemeStore(state => state.isDarkMode);
    const toggleDarkMode = useThemeStore(state => state.toggleDarkMode);

    return (
        <div className="lg:flex-1 bg-white dark:bg-gray-900 p-8 lg:p-12 flex items-center justify-center">
            <div className="w-full max-w-md space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Cadastro</h2>
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

                <Form action={handleSubmitRegister} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nome Completo
                        </Label>
                        <div className="relative">
                            <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                required
                                className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nome de usuário
                        </Label>
                        <div className="relative">
                            <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="thejohndoe"
                                required
                                className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <RegisterButton />
                </Form>



                <Button variant="link" onClick={() => setStep('email')} className="w-full text-orange-500">
                    Voltar para e-mail
                </Button>


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
    )
}