import { useState } from 'react';

const HelpCenter = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { id: 1, question: 'How to ask legal questions?' },
    { id: 2, question: 'How accurate is the AI?' },
    { id: 3, question: 'Is my data secure?' },
    { id: 4, question: 'How to scan documents?' },
  ];

  const supportOptions = [
    {
      icon: '🎧',
      title: 'Contact Support',
      description: 'Chat via online and solve technical issue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: '✉️',
      title: 'Email Support',
      description: 'Get a detailed response within 6 hours',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: '⚠️',
      title: 'Report Issue',
      description: 'Submit any technical bugs or data discrepancies',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: '💬',
      title: 'Community Forum',
      description: 'Discuss with the community and share your experiences',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">How can we assist you today?</h1>
          <p className="text-blue-100 mb-8">
            Access government-grade legal intelligence and technical support documentation
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full px-6 py-4 rounded-lg text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
              🔍
            </span>
          </div>

          {/* Quick Filter Tags */}
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            <button className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-all border border-white/20">
              Popular
            </button>
            <button className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-all border border-white/20">
              Document Scanning
            </button>
            <button className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-all border border-white/20">
              Data Privacy
            </button>
            <button className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-all border border-white/20">
              Account Security
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - FAQs */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-orange-500 rounded"></div>
              <h2 className="text-2xl font-bold text-blue-900">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700 font-medium">{faq.question}</span>
                    <span className="text-gray-400 text-xl">
                      {openFaq === faq.id ? '▲' : '▼'}
                    </span>
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        This is the answer to the question. You can add detailed information here
                        about how to use the feature or resolve the issue.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Support Options */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-orange-500 rounded"></div>
              <h2 className="text-2xl font-bold text-blue-900">Support Options</h2>
            </div>

            <div className="space-y-4">
              {supportOptions.map((option, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${option.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-2xl ${option.iconColor}`}>{option.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {option.title}
                      </h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
