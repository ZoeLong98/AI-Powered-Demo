import { useState, useEffect } from 'react';
import './App.css';
import { Button } from '@/components/ui/button';

function App() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <>
      <p className="font-bold text-3xl">{message}</p>
      <Button variant="outline">Click me</Button>
    </>
  );
}

export default App;
