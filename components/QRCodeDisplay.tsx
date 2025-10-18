import React from 'react';

interface QRCodeDisplayProps {
    url: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ url }) => {
    const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;

    return (
        <img src={qrCodeApiUrl} alt="Promotional QR Code" width="150" height="150" />
    );
};

export default QRCodeDisplay;