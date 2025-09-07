import './App.css';
import ChatBot from './components/chat/ChatBot';
import ReviewList from './components/reviews/ReviewList';
import 'react-loading-skeleton/dist/skeleton.css';
import Navbar from './components/ui/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen relative">
        <div className="h-full pb-[70px] overflow-hidden">
          <Routes>
            <Route path="/" element={<ReviewList />} />
            <Route path="/reviews" element={<ReviewList />} />
            <Route path="/chatbot" element={<ChatBot />} />
          </Routes>
        </div>
        <Navbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
