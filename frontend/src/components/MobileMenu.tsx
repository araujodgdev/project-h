import { Switch } from "@radix-ui/react-switch";
import { Sheet, Menu, Sun, Moon } from "lucide-react";
import NavBar from "./NavBar";
import { Button } from "./ui/button";
import { SheetContent } from "./ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";

export default function MobileMenu({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean, toggleDarkMode: () => void }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-gray-800 dark:text-gray-200">
                    <Menu className="h-6 w-6" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Sheet>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                        <h2 className="text-2xl font-bold text-orange-500 mb-8">Project H</h2>
                        <NavBar />
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
            </DialogContent>
        </Dialog>
    )
}