import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function FraudulentTransactionModal({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="p-4 bg-red-800 text-white max-w-md mx-auto mt-20 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
    >
      <h2 className="text-xl font-semibold mb-4">Abnormal Transaction Detected!</h2>
      <p>This transaction seems unusual compared to your spending habits. Please review it carefully.</p>
      <div className="mt-6 flex justify-end">
        <button onClick={onRequestClose} className="px-4 py-2 rounded-md bg-red-600 text-white">
          Close
        </button>
      </div>
    </Modal>
  );
}