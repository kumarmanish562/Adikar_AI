import { useState } from 'react';

const AskQuestion = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user',
      text: 'What are my rights if I\'m arrested without a warrant?'
    },
    {
      id: 2,
      type: 'assistant',
      content: {
        explanation: 'In India, under Section 41 of the BNSS (formerly Section 41 of CrPC), the police can arrest you without a warrant only in specific cases, such as "cognizable offenses" (serious crimes like theft or assault). However, even in such cases, you maintain fundamental constitutional protections.',
        legalReferences: [
          { section: 'Section 35:', description: 'Duty of police to inform grounds of arrest.' },
          { section: 'Section 38:', description: 'Right to meet an advocate of choice.' },
          { section: 'Article 22:', description: 'Protection against arrest & detention.' }
        ],
        actionSteps: [
          'Ask for the grounds of your arrest.',
          'Demand to see the Arrest Memo.',
          'Inform a family member immediately.'
        ],
        sources: [
          'The Bharatiya Nagarik Suraksha Sanhita (2023)',
          'Supreme Court: D.K. Basu v. State of West Bengal'
        ]
      }
    }
  ]);
  const [inputText, setInputText] = useState('');

  const suggestedQuestions = [
    'What are my rights during police arrest?',
    'How to file a consumer complaint?',
    'Tenant rights in India.'
  ];

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        type: 'user',
        text: inputText
      }]);
      setInputText('');
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
        <p className="text-sm text-gray-500">Powered by Advanced Legal LLM • Updated with BNSS 2023</p>
      </div>

      {/* Chat Messages */}
      <div className="space-y-6 mb-8">
        {messages.map((message) => (
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
                      SIMPLE EXPLANATION
                    </div>
                    <p className="text-[15px] leading-[1.7] text-gray-700">{message.content.explanation}</p>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    {/* Legal References */}
                    <div className="p-4 rounded-xl bg-blue-50">
                      <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-900 mb-3">
                        <span className="text-base">⚖️</span>
                        Legal references (BNSS 2023)
                      </div>
                      <ul className="m-0 pl-5 text-[13px] leading-[1.8] text-gray-600 space-y-2">
                        {message.content.legalReferences.map((ref, index) => (
                          <li key={index}>
                            <strong>{ref.section}</strong> {ref.description}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Steps */}
                    <div className="p-4 rounded-xl bg-orange-50">
                      <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-900 mb-3">
                        <span className="text-base">📋</span>
                        Action steps
                      </div>
                      <ol className="m-0 pl-5 text-[13px] leading-[1.8] text-gray-600 space-y-2">
                        {message.content.actionSteps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Sources */}
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

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-600 cursor-pointer transition-all hover:bg-gray-100 hover:border-gray-300">
                      <span className="text-sm">📋</span>
                      Copy
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-600 cursor-pointer transition-all hover:bg-gray-100 hover:border-gray-300">
                      <span className="text-sm">💾</span>
                      Save
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-600 cursor-pointer transition-all hover:bg-gray-100 hover:border-gray-300">
                      <span className="text-sm">⬇️</span>
                      Download Answer
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
        ))}
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
          />
          <button className="w-9 h-9 border-none bg-transparent cursor-pointer text-xl transition-transform hover:scale-110">
            🎤
          </button>
          <button 
            className="px-6 py-2.5 bg-blue-500 text-white border-none rounded-lg text-sm font-semibold cursor-pointer transition-colors hover:bg-blue-600"
            onClick={handleSendMessage}
          >
            Ask ➤
          </button>
        </div>

        {/* Suggested Questions */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-semibold text-gray-500">TRY ASKING:</span>
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-600 cursor-pointer transition-all hover:bg-gray-50 hover:border-gray-300"
              onClick={() => setInputText(question)}
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
