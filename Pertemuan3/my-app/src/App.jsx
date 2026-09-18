import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

// Import asset gambar
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

// Import komponen dari folder component
import ArticleCard from './component/ArticleCard'
import Product from './component/Product'
import Profile from './component/Profile'

// Halaman Home (dengan counter & logo)
function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Welcome to My Admin
        </h1>
        <p className="text-gray-700 mb-6">
          Your Tailwind CSS React app is ready!
        </p>

        {/* Gambar Logos */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <img src={viteLogo} className="h-12 w-12" alt="Vite logo" />
          <img src={reactLogo} className="h-12 w-12 animate-spin" alt="React logo" />
        </div>

        {heroImg && (
          <img 
            src={heroImg} 
            alt="Hero" 
            className="w-full h-40 object-cover rounded-md mb-6" 
          />
        )}

        {/* Counter Section */}
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Count is {count}
        </button>
      </div>
    </div>
  )
}

// Halaman About
function About() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-2">About Page</h1>
        <p className="text-gray-600">Ini adalah halaman tentang aplikasi admin kamu.</p>
      </div>
    </div>
  )
}

// Komponen Utama App
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigasi / Header */}
      <nav className="bg-white shadow-sm p-4 border-b border-gray-200">
        <div className="max-w-4xl mx-auto flex gap-6 font-semibold">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/article" className="text-gray-700 hover:text-blue-600 transition">
            Article
          </Link>
          <Link to="/product" className="text-gray-700 hover:text-blue-600 transition">
            Product
          </Link>
          <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition">
            Profile
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </Link>
        </div>
      </nav>

      {/* Konten Berdasarkan Route */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article" element={<ArticleCard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}