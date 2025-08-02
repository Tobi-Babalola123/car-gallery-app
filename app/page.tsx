"use client"

import { useState, useMemo } from "react"
import CarCard from "@/components/CarCard"
import CarModal from "@/components/CarModal"
import ContactModal from "@/components/ContactModal"
import SearchBar from "@/components/SearchBar"
import { carData } from "@/lib/carData"
import type { Car } from "@/lib/carData"

export default function Home() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactCarId, setContactCarId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCars = useMemo(() => {
    if (!searchTerm) return carData

    return carData.filter(
      (car) =>
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  const handleCarClick = (car: Car) => {
    setSelectedCar(car)
  }

  const handleRequestViewing = (carId: string) => {
    setContactCarId(carId)
    setShowContactModal(true)
    setSelectedCar(null)
  }

  const handleCloseModals = () => {
    setSelectedCar(null)
    setShowContactModal(false)
    setContactCarId(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Premium Car Sales</h1>
            <p className="text-lg text-gray-600">Find your perfect car from our curated collection</p>
          </div>

          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredCars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No cars found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onClick={() => handleCarClick(car)}
                onRequestViewing={() => handleRequestViewing(car.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedCar && (
        <CarModal
          car={selectedCar}
          onClose={handleCloseModals}
          onRequestViewing={() => handleRequestViewing(selectedCar.id)}
        />
      )}

      {showContactModal && contactCarId && <ContactModal carId={contactCarId} onClose={handleCloseModals} />}
    </div>
  )
}
