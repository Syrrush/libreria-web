/* eslint-disable @next/next/no-img-element */

export default function Footer() {
    return (
        <footer className="text-white py-4">
            <div className="flex items-center justify-center space-x-4">
                <a
                    href="https://www.linkedin.com/in/sebastian-zanatta/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="./linkedin.png" // Reemplaza con la URL de tu imagen de Linkedin
                        alt="Linkedin"
                        className="w-7 h-7 hover:border-blue-500 border-transparent transition duration-300 border rounded-full"
                    />
                </a>
                <p className="text-center">Created by Sebastián Zanatta</p>
                <a
                    href="https://github.com/Syrrush/read-hub"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="./github.png" // Reemplaza con la URL de tu imagen de GitHub
                        alt="GitHub"
                        className="w-7 h-7 hover:border-blue-500 border-transparent transition duration-300 border rounded-full"
                    />
                </a>
            </div>
        </footer>
    );
}