import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const VoiceAssistant = () => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isListening, setIsListening] = useState(false);
  const [hasResponse, setHasResponse] = useState(false);

  const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali'];

  const handleMicClick = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setHasResponse(true);
      }, 3000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-6">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Speak Your Legal Question</h1>
          <p className="text-[15px] text-gray-500 mb-6">Ask legal questions in your language.</p>

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
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Control Section */}
        <div className="text-center my-12">
          <button 
            className={`w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-none cursor-pointer flex items-center justify-center mx-auto mb-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl ${
              isListening ? 'animate-pulse' : ''
            }`}
            onClick={handleMicClick}
          >
            <span className="text-6xl text-white">🎤</span>
          </button>

          {isListening ? (
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-4xl text-orange-500 animate-bounce">🔊</span>
              <span className="text-base font-semibold text-orange-500 tracking-wide">LISTENING...</span>
            </div>
          ) : (
            <p className="text-[15px] text-gray-500">
              {hasResponse ? 'Tap to ask another question' : 'Tap the microphone to start speaking'}
            </p>
          )}
        </div>

        {/* Response Content */}
        {hasResponse && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* Your Question */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <span className="text-xl">👤</span>
                <h3 className="text-[15px] font-semibold text-gray-900">Your Question</h3>
              </div>
              <p className="text-sm leading-[1.7] text-gray-700 italic mb-4 p-4 bg-gray-50 rounded-lg">
                "Someone borrowed money from me and is refusing to pay it back. 
                What can I do under the new laws?"
              </p>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-transparent border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-pointer transition-all hover:bg-gray-50 hover:border-gray-300">
                <span>✏️</span>
                Edit text
              </button>
            </div>

            {/* AI Response */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <span className="text-xl">🤖</span>
                <h3 className="text-[15px] font-semibold text-gray-900">AI Legal Guidance</h3>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-900 rounded-lg text-[13px] font-semibold mb-4">
                <span>⚡</span>
                Confidence: High
              </div>

              {/* Explanation */}
              <div className="mb-5">
                <h4 className="text-[11px] font-bold text-gray-500 tracking-wide mb-3">EXPLANATION</h4>
                <p className="text-sm leading-[1.7] text-gray-700">
                  Under Indian law, refusing to return borrowed money can be treated as a 
                  civil matter for recovery of dues or, in specific cases of dishonesty, 
                  a criminal matter under the implementation of the Bharatiya Nyaya Sanhita (BNS), 
                  your primary route is filing a summary suit for recovery.
                </p>
              </div>

              {/* Legal References */}
              <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-lg mb-5">
                <h4 className="text-xs font-bold text-gray-900 mb-3">LEGAL REFERENCES</h4>
                <ul className="m-0 pl-5 text-[13px] leading-[1.8] text-gray-700 space-y-2">
                  <li>
                    <strong className="text-orange-500">BNS Sec 316:</strong> Criminal breach of trust -applicable if there was 
                    a dishonest intent from the start.
                  </li>
                  <li>
                    <strong className="text-orange-500">BNSS Sec 183:</strong> Procedure for filing a police report if criminal 
                    intent is suspected.
                  </li>
                </ul>
              </div>

              {/* Suggested Next Steps */}
              <div className="mb-5">
                <h4 className="text-[11px] font-bold text-gray-500 tracking-wide mb-3">SUGGESTED NEXT STEPS</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '📧', title: 'Send Legal Notice', desc: 'Formally demand the money within 15 days.' },
                    { icon: '📄', title: 'Gather Evidence', desc: 'Keep bank statements and chat texts.' }
                  ].map((step, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg flex gap-3">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-base flex-shrink-0">
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <h5 className="text-[13px] font-semibold text-gray-900 mb-1">{step.title}</h5>
                        <p className="text-xs text-gray-500">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-5 border-t border-gray-200">
                <button className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white text-gray-600 border border-gray-200 rounded-lg text-sm font-semibold cursor-pointer transition-all hover:bg-gray-50">
                  <span className="text-base">🔄</span>
                  Ask another question
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white text-gray-600 border border-gray-200 rounded-lg text-sm font-semibold cursor-pointer transition-all hover:bg-gray-50">
                  <span className="text-base">💾</span>
                  Save response
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-orange-500 text-white rounded-lg text-sm font-semibold cursor-pointer transition-all hover:bg-orange-600">
                  <span className="text-base">⬇️</span>
                  Download answer
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
