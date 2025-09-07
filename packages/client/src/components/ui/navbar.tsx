import { RiRobot2Line } from 'react-icons/ri';
import { MdOutlineReviews } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="absolute bottom-0 flex justify-around items-center w-full h-[70px] bg-white">
      <div
        className={`flex flex-col items-center cursor-pointer ${
          location.pathname === '/reviews' ? 'text-pink-500' : 'text-gray-600'
        }`}
        onClick={() => navigate('/reviews')}
      >
        <MdOutlineReviews size={30} />
        <p>Reviews</p>
      </div>

      <div
        className={`flex flex-col items-center cursor-pointer ${
          location.pathname === '/chatbot' ? 'text-pink-500' : 'text-gray-600'
        }`}
        onClick={() => navigate('/chatbot')}
      >
        <RiRobot2Line size={30} />
        <p>ChatBot</p>
      </div>
    </div>
  );
};

export default Navbar;
