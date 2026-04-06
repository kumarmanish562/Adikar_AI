import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AskQuestion = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    'What are my rights during police arrest?',
    'How to file a consumer complaint?',
    'What are tenant rights in India?',
    'What is domestic violence law?',
    'How to file an RTI application?'
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText
    };

    setMessages(prev => [...prev, userMessage]);
    const currentQuestion = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      // Get auth token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Please log in to ask questions');
      }
      
      // Call authenticated backend API that saves queries
      const response = await axios.post(
        'http://localhost:8000/api/queries/ask',
        {
          question: currentQuestion,
          language: 'en',
          query_type: 'text'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('API Response:', response.data);
      
      // Ensure we have valid data
      const answerText = response.data.answer || response.data.explanation || 'No answer received';
      const legalRefs = Array.isArray(response.data.legalReferences) ? response.data.legalReferences : [];
      const actionSteps = Array.isArray(response.data.actionSteps) ? response.data.actionSteps : [];
      const sources = Array.isArray(response.data.sources) ? response.data.sources : [];

      console.log('Processed answer text length:', answerText.length);

      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: {
          explanation: answerText,
          legalReferences: legalRefs,
          actionSteps: actionSteps,
          sources: sources.map(s => typeof s === 'string' ? s : s.source || s)
        }
      };

      console.log('Assistant message:', assistantMessage);

      setMessages(prev => [...prev, assistantMessage]);
      
      // Show success message and option to go to history
      setTimeout(() => {
        const successMessage = {
          id: Date.now() + 2,
          type: 'system',
          content: {
            message: 'Query saved successfully! You can view it in your history.',
            showHistoryButton: true
          }
        };
        setMessages(prev => [...prev, successMessage]);
      }, 1000);
    } catch (error) {
      console.error('Error asking question:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: {
          explanation: 'Sorry, I encountered an error processing your question. Please make sure you are logged in and try again.',
          legalReferences: [],
          actionSteps: ['Check your internet connection', 'Make sure you are logged in', 'Try refreshing the page'],
          sources: []
        }
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ask Your Legal Question</h1>
        <p className="text-sm text-gray-500">Powered by Advanced Legal AI • Updated with BNSS 2023</p>
      </div>

      {/* Chat Messages */}
      <div className="space-y-6 mb-8 min-h-[400px]">
        {messages.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚖️</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Ask Your Legal Question</h2>
            <p className="text-gray-500">Get instant answers from Indian legal documents</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id}>
              {message.type === 'user' ? (
                <div className="flex justify-end items-start gap-3">
                  <div className="bg-blue-500 text-white py-3 px-5 rounded-[20px] max-w-[600px] text-[15px] leading-relaxed">
                    {message.text}
                  </div>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 bg-yellow-100">
                    👤
                  </div>
                </div>
              ) : message.type === 'system' ? (
                <div className="flex justify-center">
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4 max-w-md text-center">
                    <div className="text-green-600 text-2xl mb-2">✅</div>
                    <p className="text-green-800 text-sm mb-3">{message.content.message}</p>
                    {message.content.showHistoryButton && (
                      <button
                        onClick={() => navigate('/dashboard/my-queries')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                      >
                        View History
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 bg-blue-100">
                    🤖
                  </div>
                  <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    {/* Explanation */}
                    <div className="mb-5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-500 rounded-md text-[11px] font-semibold tracking-wide mb-3">
                        <span className="text-sm">💡</span>
                        ANSWER
                      </div>
                      <p className="text-[15px] leading-[1.7] text-gray-700 whitespace-pre-wrap">{message.content.explanation}</p>
                    </div>

                    {/* Info Grid */}
                    {(message.content.legalReferences?.length > 0 || message.content.actionSteps?.length > 0) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        {/* Legal References */}
                        {message.content.legalReferences && message.content.legalReferences.length > 0 && (
                          <div className="p-4 rounded-xl bg-blue-50">
                            <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-900 mb-3">
                              <span className="text-base">⚖️</span>
                              Legal References
                            </div>
                            <ul className="m-0 pl-5 text-[13px] leading-[1.8] text-gray-600 space-y-2">
                              {message.content.legalReferences.map((ref, index) => (
                                <li key={index}>
                                  <strong>{ref.section}</strong> {ref.description}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Action Steps */}
                        {message.content.actionSteps && message.content.actionSteps.length > 0 && (
                          <div className="p-4 rounded-xl bg-orange-50">
                            <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-900 mb-3">
                              <span className="text-base">📋</span>
                              Action Steps
                            </div>
                            <ol className="m-0 pl-5 text-[13px] leading-[1.8] text-gray-600 space-y-2">
                              {message.content.actionSteps.map((step, index) => (
                                <li key={index}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Sources */}
                    {message.content.sources && message.content.sources.length > 0 && (
                      <div className="mb-5">
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wide mb-2">OFFICIAL SOURCES</div>
                        <div className="flex flex-wrap gap-2">
                          {message.content.sources.map((source, index) => (
                            <span key={index} className="px-3 py-1.5 bg-gray-100 rounded-md text-xs text-gray-600">
                              {source}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
                      <button 
                        onClick={() => navigator.clipboard.writeText(message.content.explanation)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-600 cursor-pointer transition-all hover:bg-gray-100 hover:border-gray-300"
                      >
                        <span className="text-sm">📋</span>
                        Copy
                      </button>
                      <div className="flex items-center gap-2 ml-auto">
                        <span className="text-[13px] text-gray-500">Helpful?</span>
                        <button className="w-8 h-8 border border-gray-200 bg-white rounded-md cursor-pointer transition-all hover:bg-gray-50 hover:scale-110 text-base">
                          👍
                        </button>
                        <button className="w-8 h-8 border border-gray-200 bg-white rounded-md cursor-pointer transition-all hover:bg-gray-50 hover:scale-110 text-base">
                          👎
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 bg-blue-100">
              🤖
            </div>
            <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="animate-pulse">Analyzing legal documents...</div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
        <div className="flex items-center gap-3 bg-gray-50 border-2 border-gray-200 rounded-xl px-3 py-2 mb-4">
          <button className="w-9 h-9 border-none bg-transparent cursor-pointer text-xl transition-transform hover:scale-110">
            🔍
          </button>
          <input
            type="text"
            className="flex-1 border-none bg-transparent text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
            placeholder="Type your legal question in simple language..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <button 
            className="px-6 py-2.5 bg-blue-500 text-white border-none rounded-lg text-sm font-semibold cursor-pointer transition-colors hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={handleSendMessage}
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading ? 'Asking...' : 'Ask ➤'}
          </button>
        </div>

        {/* Suggested Questions */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-semibold text-gray-500">TRY ASKING:</span>
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-600 cursor-pointer transition-all hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50"
              onClick={() => setInputText(question)}
              disabled={isLoading}
            >
              "{question}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
