
import { Home, Bell, Mail, User } from "lucide-react";
import { Button } from "./ui/button";

export default function NavBar() {
    return (
        <nav className="space-y-4 max-w-36">
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
}