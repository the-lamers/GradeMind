import { useState, useRef } from "react";

interface VoiceRecorderProps {
    onAudioReady: (audioBlob: Blob | null) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onAudioReady }) => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      setAudioBlob(audioBlob);
      audioChunksRef.current = [];
      onAudioReady(audioBlob);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

//   const sendAudioToServer = async () => {
//     if (!audioBlob) return;

//     const formData = new FormData();
//     formData.append("audio", audioBlob, "recording.webm");

//     try {
//       const response = await fetch("http://localhost:5000/upload-audio", {
//         method: "POST",
//         body: formData, // No need to set `Content-Type`, FormData handles it
//       });

//       const data = await response.json();
//       console.log("Server response:", data);
//     } catch (error) {
//       console.error("Upload error:", error);
//     }
//   };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      {/* {audioBlob && (
        <div>
          <audio controls src={URL.createObjectURL(audioBlob)} />
          <button onClick={sendAudioToServer}>Upload</button>
        </div>
      )} */}
    </div>
  );
};

export default VoiceRecorder;
