import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { HiHome, HiMenu, HiUser, HiMail } from "react-icons/hi";

type NavbarProps = {
  onToggleMenu: () => void;
  onClose:() => void;
};

export default function Navbar({ onToggleMenu, onClose }: NavbarProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isLoggedIn = !!user;

  return (
    <>
      <nav className="custom-navbar fixed top-0 left-0 w-full text-white flex items-center justify-between px-4 py-3 z-50 shadow-md">
        {/* Bloc gauche : Home + Burger */}
        <div className="flex items-center space-x-4">
          <button onClick={() => {
            navigate("/");
            onClose();
          }}
          className="text-white text-2xl">
            <HiHome />
          </button>

          <div className="sm:hidden">
            <button
              onClick={onToggleMenu}
              className="text-white text-2xl"
            >
              <HiMenu />
            </button>
          </div>
        </div>

        {/* Bloc droit : Connexion / Profil */}
        <div className="flex items-center space-x-3">
          {isLoggedIn ? (
            <>
              <button
                 onClick={() => {
                  onClose();
                  navigate(`/users/${user.id}`);
                }}
                className="text-white text-2xl"
              >
                <HiUser />
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate("/notifications");
                }}
                className="text-white text-2xl"
              >
                <HiMail />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  onClose();
                  navigate("/signin");
                }}
                className="bg-white border px-3 py-1 rounded text-black"
                style={{ borderColor: "var(--outlineBorder)" }}
              >
                Connexion
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate("/signup");
                }}
                className="bg-white border px-3 py-1 rounded text-black"
                style={{ borderColor: "var(--outlineBorder)" }}
              >
                Créer un compte
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Spacer pour éviter que le contenu passe sous la navbar */}
      <div className="h-16"></div>
    </>
  );
}
