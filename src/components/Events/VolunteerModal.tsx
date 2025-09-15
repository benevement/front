import { useState, useEffect } from "react";

type Volunteer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

type Props = {
  volunteers: Volunteer[];
  selectedIds?: number[];
  onConfirm: (selected: Volunteer[]) => void;
  onClose: () => void;
};

export default function VolunteerModal({
  volunteers,
  selectedIds = [],
  onConfirm,
  onClose,
}: Props) {
  const [selected, setSelected] = useState<number[]>(selectedIds);

  useEffect(() => {
    setSelected(selectedIds); // pour réinitialiser si les props changent
  }, [selectedIds]);



  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    const selectedVolunteers = volunteers.filter((v) =>
      selected.includes(v.id)
    );
    onConfirm(selectedVolunteers);
    console.log(selectedVolunteers)
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-3">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Sélectionner des bénévoles</h2>

        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {volunteers.map((volunteer) => (
            <li key={volunteer.id} className="flex items-center gap-2">
              <input
                id={`volunteer-${volunteer.id}`}
                type="checkbox"
                className="text-black"
                checked={selected.includes(volunteer.id)}
                onChange={() => toggle(volunteer.id)}
              />
              <p>{volunteer.first_name} {volunteer.last_name} </p>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-end gap-2">
          <button
            className="custom-button "
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            type="button"
            id="validate-volunteers"
            className="custom-button"
            onClick={handleConfirm}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
