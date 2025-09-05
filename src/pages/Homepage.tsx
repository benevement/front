import { useState } from "react";
import arenaOne from "../assets/arena_one.jpg"
import benevoles from "../assets/benevoles.jpg"
import hands from "../assets/copains_mains.jpg"
import { useAuthStore } from "../stores/useAuthStore";
import { Link } from "react-router-dom";


export default function Homepage() {
  const images = [ arenaOne, benevoles, hands ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useAuthStore();
  console.log("user", user)


  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-6">
      {/* Texte d'accueil */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-600">Benevement</h1>
        <p className="text-lg text-gray-700 max-w-xl">
          Rejoignez la communauté de volontaires pour l'organisation d'évènements près de chez vous.
        </p>
      </div>

      {user && (
         <p className="text-xl text-green-600">
            Bienvenue, {user.first_name} !
          </p>
      )}
      {/* Carrousel */}
      <div className="relative w-full max-w-4xl h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Flèches */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 transition"
        >
          &#8592;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 transition"
        >
          &#8594;
        </button>

        {/* Indicateurs */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-blue-600" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {user && (
         <Link
          to="/events"
          className="custom-button"
        >
          Voir les événements
        </Link>
      )}

    </div>
  );
}
