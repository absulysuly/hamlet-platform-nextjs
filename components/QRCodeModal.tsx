import React from 'react';
import { XMarkIcon } from './icons/Icons.tsx';

interface QRCodeModalProps {
    url: string;
    title: string;
    onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ url, title, onClose }) => {
    // Using an external service to generate the QR code image
    const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}`;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="glass-card rounded-lg shadow-xl w-full max-w-xs p-6 text-center relative text-slate-100"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-2 right-2 p-2 rounded-full hover:bg-white/10">
                    <XMarkIcon className="w-6 h-6" />
                </button>
                <h3 className="text-lg font-bold mb-4">{title}</h3>
                <div className="bg-white p-4 rounded-md inline-block">
                    <img src={qrCodeApiUrl} alt="QR Code" width="200" height="200" />
                </div>
                <p className="text-xs text-slate-400 mt-4">
                    Scan this code to see all candidates from this party in this governorate.
                </p>
            </div>
        </div>
    );
};

export default QRCodeModal;