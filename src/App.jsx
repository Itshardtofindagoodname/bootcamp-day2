import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';

const CherryBlossom = ({ style }) => (
  <div 
    className="fixed -top-10 opacity-70 transform rotate-45"
    style={{
      ...style,
      width: '10px',
      height: '20px',
      backgroundColor: '#FF0535',
      borderRadius: '10px 0'
    }}
  />
);

const App = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the Dojo", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [petals, setPetals] = useState([]);
  const messagesEndRef = useRef(null);

  const generatePetals = () => {
    const newPetals = Array.from({ length: 50 }).map((_, index) => ({
      id: Date.now() + index,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 10,
      delay: Math.random() * 5
    }));
    setPetals(newPetals);
  };

  useEffect(() => {
    generatePetals();
  }, []);

const handleSend = async () => {
  console.log('code kaun likhega?');
};

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {petals.map((petal) => (
        <CherryBlossom 
          key={petal.id}
          style={{
            left: `${petal.left}%`,
            animationName: 'topFallPetal',
            animationDuration: `${petal.animationDuration}s`,
            animationDelay: `${petal.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        />
      ))}

      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div 
          className="h-[500px] overflow-y-auto p-4 space-y-4"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.3) transparent'
          }}
        >
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`p-3 rounded-xl max-w-[80%] 
                ${msg.sender === 'bot' 
                  ? 'bg-pink-600/50 text-white self-start' 
                  : 'bg-pink-200/50 text-black self-end ml-auto'
                }
                transform transition-all duration-300 ease-in-out animate-fadeIn
              `}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-pink-100 flex items-center space-x-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-grow p-2 rounded-xl bg-white text-pink-700 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button 
            onClick={handleSend} 
            className="bg-pink-700 p-2 rounded-full hover:bg-pink-500 transition-colors"
          >
            <SendHorizontal className="text-white" />
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes topFallPetal {
          0% { 
            transform: translateY(-100%) rotate(0deg); 
            opacity: 0.7;
          }
          100% { 
            transform: translateY(100vh) rotate(360deg); 
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default App;