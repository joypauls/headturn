import { BrowserRouter, Route, Routes } from "react-router"
import { Navbar } from "@/components/ui/navbar"
import { ViewerPage } from "@/pages/ViewerPage"
import { AboutPage } from "@/pages/AboutPage"
import { HowToPage } from "@/pages/HowToPage"

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-screen flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<ViewerPage />} />
            <Route path="/how-to" element={<HowToPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
