import { useState } from 'react';

interface Prediction {
  label: string;
  confidence: number;
  inference_time: number; // in milliseconds
}

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Prediction failed');
      }
      const data = await response.json();
      setPrediction(data);
      setError('');
    } catch (err) {
      setError('Error processing image');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">AI Vision Studio</h1>
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-4 shadow-lg">
        <input
          type="file"
          accept="image/*"
          className="mb-4 p-2 bg-gray-700 rounded-lg w-full text-white"
          onChange={handleFileChange}
        />
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Classify Image
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {prediction && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Prediction</h2>
            <p><strong>Label:</strong> {prediction.label}</p>
            <p><strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(2)}%</p>
            <p><strong>Inference Time:</strong> {prediction.inference_time.toFixed(2)} ms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;