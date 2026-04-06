import { useState } from 'react';
import axios from 'axios';

const VoiceAssistant = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [response, setResponse] = useState(null);

  const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali'];

  const handleMicClick = async () => {
    if (isListening) {
      // Stop listening
      setIsListening(false);
      return;
    }

    // Start listening
    setIsListening(true);
    
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLanguage === 'Hindi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscribedText(transcript);
      setIsListening(false);
      setIsProcessing(true);

      try {
        // Get auth token
        const token = localStorage.getItem('token');
        
        // Send question to backend
        const result = await axios.post(
          '/api/queries/ask',
          {
            question: transcript,
            language: selectedLanguage === 'Hindi' ? 'hi' : 'en',
            query_type: 'voice'  // Add this to identify voice queries
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        setResponse({
          question: transcript,
          answer: result.data.explanation || result.data.answer,
          legalReferences: result.data.legalReferences || [],
          actionSteps: result.data.actionSteps || [],
          sources: result.data.sources || []
        });
      } catch (error) {
        console.error('Error processing voice question:', error);
        setResponse({
          question: transcript,
          answer: 'Sorry, I encountered an error processing your question. Please try again.',
          legalReferences: [],
          actionSteps: ['Check your internet connection', 'Make sure you are logged in'],
          sources: []
        });
      } finally {
        setIsProcessing(false);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      alert('Error recognizing speech. Please try again.');
    };

    recognition.start();
  };

  const handleAskAnother = () => {
    setTranscribedText('');
    setResponse(null);
  };

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-6">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Speak Your Legal Question</h1>
          <p className="text-[15px] text-gray-500 mb-6">Ask legal questions in your language using voice.</p>

          {/* Language Selector */}
          <div className="flex justify-center gap-3 flex-wrap">
            {languages.map((lang) => (
              <button
                key={lang}
                className={`px-5 py-2.5 border-2 rounded-lg text-sm font-medium cursor-pointer transition-all ${
                  selectedLanguage === lang
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-500'
                }`}
                onClick={() => setSelectedLanguage(lang)}
                disabled={isListening || isProcessing}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Control Section */}
        <div className="text-center my-12">
          <button 
            className={`w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-none cursor-pointer flex items-center justify-center mx-auto mb-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
              isListening ? 'animate-pulse' : ''
            }`}
            onClick={handleMicClick}
            disabled={isProcessing}
          >
            <span className="text-6xl text-white">🎤</span>
          </button>

          {isListening ? (
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-4xl text-orange-500 animate-bounce">🔊</span>
              <span className="text-base font-semibold text-orange-500 tracking-wide">LISTENING...</span>
            </div>
          ) : isProcessing ? (
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-base font-semibold text-blue-500">Processing your question...</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          ) : (
            <p className="text-[15px] text-gray-500">
              {response ? 'Tap to ask another question' : 'Tap the microphone to start speaking'}
            </p>
          )}
        </div>

        {/* Response Content */}
        {response && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* Your Question */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <span className="text-xl">👤</span>
                <h3 className="text-[15px] font-semibold text-gray-900">Your Question</h3>
              </div>
              <p className="text-sm leading-[1.7] text-gray-700 italic mb-4 p-4 bg-gray-50 rounded-lg">
                "{response.question}"
              </p>
              <div className="text-xs text-gray-500">
                Language: {selectedLanguage}
              </div>
            </div>

            {/* AI Response */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <span className="text-xl">🤖</span>
                <h3 className="text-[15px] font-semibold text-gray-900">AI Legal Guidance</h3>
              </div>

              {/* Explanation */}
              <div className="mb-5">
                <h4 className="text-[11px] font-bold text-gray-500 tracking-wide mb-3">ANSWER</h4>
                <p className="text-sm leading-[1.7] text-gray-700 whitespace-pre-wrap">
                  {response.answer}
                </p>
              </div>

              {/* Legal References */}
              {response.legalReferences && response.legalReferences.length > 0 && (
                <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-lg mb-5">
                  <h4 className="text-xs font-bold text-gray-900 mb-3">LEGAL REFERENCES</h4>
                  <ul className="m-0 pl-5 text-[13px] leading-[1.8] text-gray-700 space-y-2">
                    {response.legalReferences.map((ref, index) => (
                      <li key={index}>
                        <strong className="text-orange-500">{ref.section}</strong> {ref.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Steps */}
              {response.actionSteps && response.actionSteps.length > 0 && (
                <div className="mb-5">
                  <h4 className="text-[11px] font-bold text-gray-500 tracking-wide mb-3">SUGGESTED NEXT STEPS</h4>
                  <div className="space-y-2">
                    {response.actionSteps.map((step, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg flex gap-3">
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                          {index + 1}
                        </span>
                        <div className="text-[13px] text-gray-700">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sources */}
              {response.sources && response.sources.length > 0 && (
                <div className="mb-5">
                  <h4 className="text-[11px] font-bold text-gray-500 tracking-wide mb-2">SOURCES</h4>
                  <div className="flex flex-wrap gap-2">
                    {response.sources.map((source, index) => (
                      <span key={index} className="px-3 py-1.5 bg-gray-100 rounded-md text-xs text-gray-600">
                        {typeof source === 'string' ? source : source.source}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-5 border-t border-gray-200">
                <button 
                  onClick={handleAskAnother}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-blue-500 text-white rounded-lg text-sm font-semibold cursor-pointer transition-all hover:bg-blue-600"
                >
                  <span className="text-base">🔄</span>
                  Ask another
                </button>
                <button 
                  onClick={() => navigator.clipboard.writeText(response.answer)}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white text-gray-600 border border-gray-200 rounded-lg text-sm font-semibold cursor-pointer transition-all hover:bg-gray-50"
                >
                  <span className="text-base">📋</span>
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistant;
