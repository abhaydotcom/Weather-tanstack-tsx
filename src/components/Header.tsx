import { useTheme } from "@/context/ThemeProvider"
import { Link } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"
import CitySearch from "./citySearch"

function Header() {
    const {theme}=useTheme()
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
        <div className="container mx-auto h-16 flex justify-between items-center px-4">
            <Link to={'/'}>
            <img src={theme==="dark"? "/logo123.png":"logo1205.png"}
            className={`h-14 hover:rotate-360 transition-transform duration-500 `}
             alt="logo " />
            </Link>

            <div className="flex gap-4">
                <CitySearch/>
                    <ThemeToggle/>
            </div>

        </div>
    </header>
  )
}

export default Header