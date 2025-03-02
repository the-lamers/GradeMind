import { useState, useRef } from "react";
import { FaMicrophoneAlt } from "react-icons/fa";

interface VoiceRecorderProps {
    onAudioReady: (audioBlob: Blob | null) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onAudioReady }) => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const startRecording = async () => {
    try{
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

        stream.getTracks().forEach(track => track.stop()); // Release the mic
      };
  
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
    } catch(error) {
      alert("Что-то пошло не так...");
      console.error(error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="record-container">
      <button onClick={recording ? stopRecording : startRecording} className={recording ? "recording-btn recording-on" : "recording-btn"}>
        <FaMicrophoneAlt />
      </button>
      {audioBlob && (
        <div>
          <audio controls src={URL.createObjectURL(audioBlob)} />
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
