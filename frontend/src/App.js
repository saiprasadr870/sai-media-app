import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [user, setUser] = useState('');

  const handleUpload = async (e, type) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', text);
    formData.append('user', user);

    const endpoint = type === 'photo' ? '/upload_photo' : '/upload_video';

    try {
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h1>Sai Media</h1>
      <form>
        <input type="text" placeholder="User" onChange={(e) => setUser(e.target.value)} />
        <input type="text" placeholder="Text" onChange={(e) => setText(e.target.value)} />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={(e) => handleUpload(e, 'photo')}>Upload Photo</button>
        <button onClick={(e) => handleUpload(e, 'video')}>Upload Video</button>
      </form>
    </div>
  );
}

export default App;
