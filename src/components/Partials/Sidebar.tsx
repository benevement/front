import clsx from "clsx";
import { roleType } from '../../interfaces/IUser';
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { useState } from "react";
import Deconnect from "../connectedUser/Deconnect";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  // onClose  et isOpen proviennent de App.tsx : <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
  // handleCloseSidebar : fonction de toggle true/false pour isSideBarOpen, qui est un booléen.
  const allRoles: roleType[] = ["connected_user", "volunteer", "admin"];
  const eventMembersRoles: roleType[] = ["volunteer", "admin"];
  let flag1 = false;
  if (eventMembersRoles && flag1) console.log("eventMembersRole: ",eventMembersRoles); // sinon erreur linter 
  const volunteerRole: roleType[] = ["volunteer"]
  const adminRole: roleType[] = ["admin"];
  const { user, logout } = useAuthStore() || {};
  const userRole: roleType | "visitor" = user?.role || "visitor";

  // Gestion fenêtre modale de déconnexion
  const [showDialog, setShowDialog] = useState(false);
  const handleLogout = (e: React.MouseEvent) => { e.preventDefault(); console.log("T1"); setShowDialog(true); };
  const handleConfirm = () => { logout(); setShowDialog(false); onClose() };
  const handleCancel = () => { setShowDialog(false); };

  return (
    <>
      {/* Overlay : visible seulement si la sidebar est ouverte */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
        ></div>
      )}
      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={clsx(
          "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full px-3 overflow-y-auto pb-16 bg-white dark:bg-gray-800">
          <button onClick={onClose} className="mb-4">
            ✖ Fermer
          </button>
          <ul className="space-y-2">
            {/* Liens visibles pour tous les rôles */}
            {allRoles.includes(userRole as roleType) && (
              <>
                <li>
                  <Link to="/events" onClick={onClose} className="block p-2 rounded hover:bg-blue-100">
                    Événements
                  </Link>
                </li>
                <li>
                  <Link to="/users/profile" onClick={onClose} className="block p-2 rounded hover:bg-blue-100">
                    Mon Profil
                  </Link>
                </li>
              </>
            )}

            {/* Liens pour les membres d'événements */}
            {volunteerRole.includes(userRole as roleType) && (
              <li>
                <Link to="/my-events" onClick={onClose} className="block p-2 rounded hover:bg-blue-100">
                  Mes événements
                </Link>
              </li>
            )}

            {/* Liens réservés aux admins */}
            {adminRole.includes(userRole as roleType) && (
              <li>
                <Link to="/events/new" onClick={onClose} className="block p-2 rounded hover:bg-blue-100">
                  Créer un événement
                </Link>
              </li>
            )}

            {/* Déconnexion utilisateur */}
            {userRole != "visitor" &&
              <li>
                <Link to="" onClick={handleLogout} className="block p-2 rounded hover:bg-blue-100">
                  Déconnexion
                </Link>
              </li>
            }

          </ul>
          {showDialog && (
            <Deconnect message="Êtes-vous sûr de vouloir vous déconnecter ?" onConfirm={handleConfirm} onCancel={handleCancel} />
          )}

          {/* Liens toujours visibles en bas */}
          <div className="space-y-2 mt-auto">
            <Link
              to="/security"
              onClick={onClose}
              className="block p-2 rounded hover:bg-blue-100"
            >
              Sécurité / RGPD
            </Link>
            <Link
              to="/about"
              onClick={onClose}
              className="block p-2 rounded hover:bg-blue-100"
            >
              À propos
            </Link>
            <Link
              to="/become_volunteer"
              onClick={onClose}
              className="block p-2 rounded hover:bg-blue-100"
            >
              Devenir bénévole
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
