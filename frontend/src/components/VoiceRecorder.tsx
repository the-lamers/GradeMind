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

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      {audioBlob && (
        <div>
          <audio controls src={URL.createObjectURL(audioBlob)} />
          {/* <button onClick={sendAudioToServer}>Upload</button> */}
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
