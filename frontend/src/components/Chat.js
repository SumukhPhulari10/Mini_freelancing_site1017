import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, User, MessageSquare } from 'lucide-react';
import Button from './Button';

const Chat = ({ isOpen, onClose, recipient }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'other',
      text: 'Hi! I\'m interested in your project. Can you tell me more about the requirements?',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      sender: 'me',
      text: 'Hello! Yes, I\'d be happy to discuss the project details. We need a full-stack e-commerce platform with React and Node.js.',
      timestamp: '10:32 AM'
    },
    {
      id: 3,
      sender: 'other',
      text: 'That sounds perfect! I have 5+ years of experience with React and Node.js. I\'ve built several e-commerce platforms.',
      timestamp: '10:33 AM'
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'me',
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Simulate response after 1 second
      setTimeout(() => {
        const responses = [
          'That sounds great! Let me know if you have any questions.',
          'I think I can help you with that. When would you like to start?',
          'Perfect! I\'m available to discuss this further.',
          'Thanks for the information. I\'ll send you a proposal soon.'
        ];
        
        const responseMessage = {
          id: messages.length + 2,
          sender: 'other',
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl w-full max-w-2xl h-[600px] flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{recipient?.name || 'John Doe'}</h3>
                  <p className="text-sm text-green-600">Online</p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
                      msg.sender === 'me'
                        ? 'bg-primary-600 text-white'
                        : 'bg-dark-tertiary text-text-primary border border-gray-700'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'me' ? 'text-primary-200' : 'text-text-secondary'
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-dark-secondary border border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-transparent text-text-primary placeholder-text-secondary"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chat;
