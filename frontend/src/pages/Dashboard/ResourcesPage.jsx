import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ResourcesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const legalCategories = [
    {
      id: 'bns',
      icon: '⚖️',
      title: 'Bharatiya Nyaya Sanhita (BNS)',
      description: 'Governing criminal code in India, replacing the Indian Penal Code with modern provisions.',
      link: '#'
    },
    {
      id: 'bnss',
      icon: '📋',
      title: 'Bharatiya Nagarik Suraksha Sanhita (BNSS)',
      description: 'Regulates the law for the administration of criminal justice, including the digital evidence.',
      link: '#'
    },
    {
      id: 'consumer',
      icon: '🛒',
      title: 'Consumer Protection Act',
      description: 'Ensuring you are aware against unfair trade practices and defective services.',
      link: '#'
    },
    {
      id: 'family',
      icon: '👨‍👩‍👧',
      title: 'Family Law',
      description: 'Marriage, divorce, maintenance, and child custody laws across various communities.',
      link: '#'
    },
    {
      id: 'property',
      icon: '🏠',
      title: 'Property Law',
      description: 'Transfer of property and estate planning, RERA, and ownership disputes.',
      link: '#'
    },
    {
      id: 'cyber',
      icon: '🛡️',
      title: 'Cyber Law',
      description: 'Legal framework for e-commerce, data protection, and hacking-related crimes.',
      link: '#'
    },
    {
      id: 'labour',
      icon: '👷',
      title: 'Labour Law',
      description: 'Rights of workers, trade unions, and protection against unfair labor practices.',
      link: '#'
    }
  ];

  const popularGuides = [
    {
      id: 1,
      number: '01',
      title: 'How to file FIR',
      description: 'Learn the step-by-step process to register a First Information Report at police station online.',
      readTime: '5 MIN READ',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      id: 2,
      number: '02',
      title: 'Consumer complaint process',
      description: 'Navigate the 3-tiered portal and seek compensation for consumer disputes and grievances.',
      readTime: '8 MIN READ',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      id: 3,
      number: '03',
      title: 'Divorce process India',
      description: 'Understanding various grounds for contested divorce proceedings under Indian matrimonial laws.',
      readTime: '12 MIN READ',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 4,
      number: '04',
      title: 'Tenant rights guide',
      description: 'Know your protections under the Model Tenancy Act regarding security deposits and rent hikes.',
      readTime: '9 MIN READ',
      color: 'bg-blue-50 text-blue-600'
    }
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 md:p-12 mb-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10">
          <div className="text-[200px] text-white">⚖️</div>
        </div>

        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-md mb-4">
            LEGAL KNOWLEDGE HUB
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Explore Indian Laws</h1>
          <p className="text-blue-100 text-base mb-6 max-w-2xl">
            Democratizing access to justice through AI-powered legal clarity. 
            Understand your rights and navigate the Indian legal system with confidence.
          </p>
          <div className="flex gap-3">
            <button 
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              onClick={() => navigate('/dashboard/ask-question')}
            >
              💬 Talk to Legal AI
            </button>
            <button className="px-6 py-3 bg-white/10 text-white border border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-colors">
              Browse Full Directory
            </button>
          </div>
        </div>
      </div>

      {/* Legal Categories */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Legal Categories</h2>
            <p className="text-sm text-gray-500">Comprehensive resources for top Indian legislations</p>
          </div>
          <div className="w-16 h-1 bg-orange-500 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {legalCategories.map((category) => (
            <div 
              key={category.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{category.description}</p>
              <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors">
                Learn More →
              </button>
            </div>
          ))}

          {/* More Categories Coming Soon Card */}
          <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl mb-3">
              ➕
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">More categories coming soon</h3>
            <p className="text-sm text-gray-500">Stay tuned for updates</p>
          </div>
        </div>
      </div>

      {/* Popular Legal Guides */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Popular Legal Guides</h2>
            <p className="text-sm text-gray-500">Step-by-step instructions for common legal procedures</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            View All Guides 📚
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularGuides.map((guide) => (
            <div 
              key={guide.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${guide.color} rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0`}>
                  {guide.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-600">{guide.readTime}</span>
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                      Read Guide →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
