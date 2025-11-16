import React from "react";

type ConfirmDialogProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Deconnect: React.FC<ConfirmDialogProps> = ({ message, onConfirm, onCancel }) => {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>{message}</p>
            <div className="flex justify-end mt-4">
              <button onClick={onCancel} className="mr-2 px-4 py-2 border-1 border-gray-200 rounded-sm cursor-pointer">
                Annuler
              </button>
              <button onClick={onConfirm} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
                Confirmer
              </button>
            </div>
          </div>
        </div>
      );
    };
    
export default Deconnect;