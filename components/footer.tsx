"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Facebook, Youtube, Phone, MessageCircle, MapPin, Mail, Clock, ChevronUp } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-50 relative">
      {/* Newsletter Section */}
      <div className="bg-white py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">KNOW IT ALL FIRST!</h2>
            <p className="text-gray-600">Never Miss Anything From Uniworth By Signing Up To Our Newsletter.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto lg:min-w-[400px]">
            <Input type="email" placeholder="Enter your email" className="flex-1 h-12 border-gray-300" />
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 h-12 font-medium">SUBSCRIBE</Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="font-bold text-xl text-gray-900">UNIWORTH</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Uniworth is a menswear brand, designed entirely in-house, stand-alone Pakistan no. 1 Shirt Brand. From
              timeless tailoring to premium formal shirts, we present a considered edit of quality, wearable clothes,
              and accessories bearing the Uniworth name.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors">
                <Instagram className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                <Facebook className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                <Youtube className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Informations */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Informations</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  How to order
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Returns & Exchange Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  PSL 2025
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Services */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Customer Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Payment Options
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Made To Measure
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Made To Measure Stores
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Loyalty Card
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Store Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Store Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600 text-sm">+92 42 111 789 456</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600 text-sm">+92 345 4037778</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600 text-sm">askus@uniworthshop.com</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gray-600 mt-0.5" />
                <span className="text-gray-600 text-sm">Mon-Sat: (10:00AM To 06:00PM)</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600 text-sm">Find our Stores</span>
              </div>
              <div className="mt-6">
                <Image
                  src="/placeholder.svg?height=40&width=120"
                  alt="Get it on Google Play"
                  width={120}
                  height={40}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">© UNIWORTH DRESS CO. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">100% Safe Checkout</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-5 bg-red-600 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">MC</span>
              </div>
              <div className="w-8 h-5 bg-blue-600 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">V</span>
              </div>
              <div className="w-8 h-5 bg-gray-800 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs">UBL</span>
              </div>
              <div className="w-8 h-5 bg-black rounded-sm flex items-center justify-center">
                <span className="text-white text-xs">▲</span>
              </div>
              <div className="w-8 h-5 bg-green-600 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs">HBL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <Button
          size="icon"
          className="w-12 h-12 rounded-full bg-amber-600 hover:bg-amber-700 shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
        <Button size="icon" className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 shadow-lg">
          <MessageCircle className="w-5 h-5" />
        </Button>
      </div>
    </footer>
  )
}
