// pages/GestionRoles.tsx
import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { roleType } from '../../interfaces/IUser';

const usersService = new UserService();

interface User {
  id: number;
  email: string;
  role: roleType;
  firstname?: string;
  lastname?: string;
  phone_number?: string;
  address?: string;
}

const roleLabels: Record<roleType, string> = {
  admin: "Responsable",
  volunteer: "Volontaire",
  connected_user: "Utilisateur connecté",
};

export default function GestionRoles() {
  const { user } = useAuthStore.getState();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [editedRoles, setEditedRoles] = useState<Record<number, roleType>>({});


  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    usersService.getUsers().then((response) => {
      setUsers(response);
    });
  }, [user, navigate]);

  const handleRoleChange = (id: number, newRole: roleType) => {
    setEditedRoles((prev) => ({ ...prev, [id]: newRole }));
      //  [id] : propriété calculée, correspond à la valeur de id passé en param.
    console.log(users);
    console.log(id, newRole);
  };

  const handleUpdate = async (id: number) => {
    const currentUser = users.find((u) => u.id === id);
    const newRole = editedRoles[id];

    if (!newRole || currentUser?.role === newRole) {
      alert("Aucun changement de rôle détecté.");
      return;
    }
    try {
      await usersService.updateUser(id, { role: newRole });

      // 🟢 Met à jour localement
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
      alert("Rôle mis à jour avec succès.");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour du rôle.");
    }
  };

  return (
    <div className="p-3">
      <h1 className="text-xl font-bold mb-4">Gestion des rôles</h1>
      <div className="overflow-x-auto text-xs">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4">Nom</th>
              <th className="py-3 px-4">Rôle</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="py-3 px-4">
                  {u.firstname} {u.lastname}
                </td>
                <td className="py-3 px-4">
                  <select
                    value={editedRoles[u.id] ?? u.role}
                    onChange={(e) =>
                      handleRoleChange(u.id, e.target.value as roleType)
                    }
                    className="border rounded-lg p-2"
                  >
                    {Object.entries(roleLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <button
                    className="custom-button"
                    onClick={() => handleUpdate(u.id)}
                  >
                   Mettre à jour
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
