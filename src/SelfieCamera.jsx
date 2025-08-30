import React, { useRef, useState } from "react";

function SelfieCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing webcam:", error);
      alert("Could not access the camera. Please allow permissions.");
    }
  };

  // Capture photo
  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 320, 240);
    const photo = canvasRef.current.toDataURL("image/png");
    setImage(photo);
  };

  return (
    <div>
      <video ref={videoRef} width="320" height="240" autoPlay></video>
      <br />
      <button onClick={startCamera}>Open Camera</button>
      <button onClick={capturePhoto}>Capture</button>
      <canvas ref={canvasRef} width="320" height="240" style={{ display: "none" }}></canvas>

      {image && (
        <div>
          <h3>Captured Selfie:</h3>
          <img src={image} alt="selfie" />
          <br />
          <a href={image} download="selfie.png">
            <button>Download</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default SelfieCamera;
