
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import jsQR from 'jsqr';

const QRScanner = ({ onClose, onSuccess }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [instruction, setInstruction] = useState("Scanning for magic QR code... ✨");
  const [isScanning, setIsScanning] = useState(true);

  const validQRCodes = ["prachidumass", "prachichor"];

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      setStream(videoStream);
      videoRef.current.srcObject = videoStream;
      scanQRCode();
    } catch (err) {
      setInstruction("Could not access camera. Please allow camera permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const scanQRCode = () => {
    if (!isScanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        if (validQRCodes.includes(code.data)) {
          setIsScanning(false);
          setInstruction("QR Code verified! ✅");
          setTimeout(() => {
            onSuccess();
          }, 1000);
        } else {
          setInstruction("Invalid QR code! Try again.");
          setTimeout(() => {
            setInstruction("Scanning for magic QR code... ✨");
          }, 2000);
        }
      } else {
        requestAnimationFrame(scanQRCode);
      }
    } else {
      requestAnimationFrame(scanQRCode);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });
          
          if (code && validQRCodes.includes(code.data)) {
            setInstruction("QR Code verified! ✅");
            onSuccess();
          } else {
            setInstruction("No valid QR code found!");
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="qr-scanner-overlay"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="qr-scanner-modal"
      >
        <button onClick={onClose} className="close-button">✕</button>
        
        <h3>Scan QR Code</h3>
        
        <div className="video-container">
          <video ref={videoRef} autoPlay playsInline muted />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
        
        <div className="qr-instruction">{instruction}</div>
        
        <div className="upload-section">
          <label className="upload-button">
            📁 Upload QR Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QRScanner;