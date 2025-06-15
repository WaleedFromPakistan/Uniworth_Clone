import { Truck, Shield, Award } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="bg-white py-16 px-4 border-t border-b border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <Truck className="w-12 h-12 text-orange-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Free Shipping</h3>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <Shield className="w-12 h-12 text-orange-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Secure Payments</h3>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <Award className="w-12 h-12 text-orange-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Premium Quality</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
