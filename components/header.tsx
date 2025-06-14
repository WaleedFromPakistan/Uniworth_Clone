"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, Search, ShoppingBag, Phone, MessageCircle, User, X } from "lucide-react"
import logo from "../public/logo.png"
import Image from "next/image"

function Marquee({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className="animate-marquee inline-block">{children}</div>
    </div>
  )
}
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Only make header transparent on home page
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Determine if header should be transparent
  const isTransparent = isHomePage && !isScrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent ? "bg-transparent" : "bg-white shadow-md"
      }`}
    >
      {/* Top Bar */}
      <div
        className={`border-b transition-colors duration-300 ${
          isTransparent ? "border-white/20 bg-black/10" : "border-gray-200 bg-gray-50"
        }`}
      >
        {isTransparent?<div className="max-w-8xl  bg-white px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 md:gap-6">
              <div className="flex items-center gap-2">
                <Phone className={`w-4 h-4 text-gray-600`} />
                <span className={`hidden sm:inline text-gray-600`}>
                  +92 42 111 789 456
                </span>
                <span className={`sm:hidden text-gray-600`}>Call Us</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className={`w-4 h-4 text-green-600`} />
                <span className={`hidden sm:inline text-gray-600"`}>
                  +92-345-4037778
                </span>
                <span className={`sm:hidden text-gray-600`}>WhatsApp</span>
              </div>
            </div>
            <div className="hidden lg:block lg:w-[300px]">
              <Marquee><span className="">
                Free shipping on orders over PKR 1500.
              </span></Marquee>
            </div>
            
            <div className="flex items-center bg-white gap-2">
              <User className={`w-4 h-4 text-gray-600`} />
              <span className={`hidden sm:inline text-gray-600 animate-marquee`}>My Account</span>
              <span className={`sm:hidden text-gray-600`}>Account</span>
            </div>
          </div>
        </div>
        :
        ""
        
      }
        
      </div>

      {/* Main Header */}
      <div className="px-4 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Menu Button - Desktop */}
          <button
            className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className={`w-8 h-8 ${isTransparent ? "text-white" : "text-gray-900"}`} />
            <span className={`font-medium ${isTransparent ? "text-white" : "text-gray-900"}`}>MENU</span>
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden flex items-center" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isTransparent ? "text-white" : "text-gray-900"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isTransparent ? "text-white" : "text-gray-900"}`} />
            )}
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* <div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center ${
                isTransparent ? "border-white bg-white/10" : "border-red-600 bg-white"
              }`}
            >
               <span className="text-red-600 font-bold text-lg md:text-xl">U</span> 
            </div> */}
            <div className="flex text-center items-center ">
              {/* <div
                className={`font-bold text-base md:text-lg tracking-wider ${isTransparent ? "text-white" : "text-gray-900"}`}
              >
                UNIWORTH
              </div>
              <div className={`text-xs tracking-widest ${isTransparent ? "text-white/80" : "text-gray-600"}`}>
                EST. 1978
              </div> */}{
                isTransparent?<Image 
              src={'https://uniworthshop.com/ui/images/icon/logo_white.svg'} 
              alt="Uniworth logo"
              width={120} 
              height={120}
              className="fill-red-600"
              />:
              <Image 
               src={logo}
               alt="logo"
               width={50}
               height={50}
               />

              }
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Search - Hidden on mobile */}
            <button className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Search className={`w-8 h-8 ${isTransparent ? "text-white" : "text-gray-900"}`} />
              <span className={`font-medium ${isTransparent ? "text-white" : "text-gray-900"}`}>SEARCH</span>
            </button>

            {/* Search Icon Only - Mobile */}
            <button className="md:hidden hover:opacity-80 transition-opacity">
              <Search className={`w-8 h-8 ${isTransparent ? "text-white" : "text-gray-900"}`} />
            </button>

            {/* Shopping Bag */}
            <button className="flex items-center gap-2 hover:opacity-80 transition-opacity relative">
              <ShoppingBag className={`w-5 h-5 ${isTransparent ? "text-white" : "text-gray-900"}`} />
              <span className={`hidden sm:inline font-medium ${isTransparent ? "text-white" : "text-gray-900"}`}>
                BAG
              </span>
              <span
                className={`absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center ${
                  isTransparent ? "bg-amber-400 text-gray-900" : "bg-amber-500 text-white"
                }`}
              >
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
          <div className="px-4 py-6 space-y-4">
            <button className="flex items-center gap-3 w-full text-left hover:bg-gray-50 p-2 rounded">
              <Search className="w-8 h-8 text-gray-600" />
              <span className="font-medium text-gray-900">Search</span>
            </button>
            <button className="flex items-center gap-3 w-full text-left hover:bg-gray-50 p-2 rounded">
              <Menu className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Categories</span>
            </button>
            <button className="flex items-center gap-3 w-full text-left hover:bg-gray-50 p-2 rounded">
              <User className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">My Account</span>
            </button>
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Phone className="w-4 h-4" />
                <span>+92 42 111 789 456</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MessageCircle className="w-4 h-4 text-green-600" />
                <span>+92-345-4037778</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
