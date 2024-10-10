export default function Hero() {
    return (
        <div className="lg:flex-1 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 dark:from-orange-600 dark:via-orange-700 dark:to-orange-800 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-orange-600/50 dark:to-orange-800/50"></div>
            <div className="relative max-w-2xl text-center lg:text-left z-10">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    Conecte-se ao <span className="text-orange-200">Project H</span>
                </h1>
                <p className="text-xl text-white opacity-90 mb-8">
                    Sua plataforma exclusiva para compartilhar ideias e colaborar com colegas da universidade.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <div className="bg-white/20 backdrop-blur-lg rounded-full px-6 py-2 text-white">
                        #ConexãoUniversitária
                    </div>
                    <div className="bg-white/20 backdrop-blur-lg rounded-full px-6 py-2 text-white">
                        #InovaçãoAcadêmica
                    </div>
                </div>
            </div>
        </div>
    )
}