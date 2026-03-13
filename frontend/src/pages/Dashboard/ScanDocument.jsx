import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ScanDocument = () => {
  const { t } = useTranslation();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setTimeout(() => setAnalysisComplete(true), 1500);
    }
  };

  const handleDragOver = (event) => event.preventDefault();

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      setTimeout(() => setAnalysisComplete(true), 1500);
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Scan or Upload Legal Document</h1>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 mb-8">
        {/* Upload Section */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50 transition-all hover:border-blue-500 hover:bg-blue-50"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="text-5xl mb-4">☁️</div>
            <div className="text-6xl mb-4 opacity-30">📄</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload File or Drag and Drop</h3>
            <p className="text-sm text-gray-500 mb-6">
              Choose a legal agreement, affidavit, or contract to begin analysis.
            </p>
            
            <div className="flex justify-center gap-3 mb-6">
              <label className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-semibold cursor-pointer transition-colors hover:bg-blue-600">
                📁 Upload File
                <input 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-blue-500 border border-blue-500 rounded-lg text-sm font-semibold cursor-pointer transition-colors hover:bg-blue-50">
                📷 Scan from Camera
              </button>
            </div>

            <div className="flex justify-center gap-3">
              <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs text-gray-500">📄 PDF</span>
              <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs text-gray-500">🖼️ JPG</span>
              <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs text-gray-500">📷 PNG</span>
            </div>
          </div>
        </div>

        {/* Document Preview */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
            <span className="text-xl">📄</span>
            <span className="text-[15px] font-semibold text-gray-900">Document Preview</span>
          </div>
          <div className="min-h-[400px] flex items-center justify-center">
            {uploadedFile ? (
              <div className="w-full h-[400px] bg-white border border-gray-200 rounded-lg p-6">
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-[70%]"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-[40%]"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-[70%]"></div>
                </div>
              </div>
            ) : (
              <div className="w-full h-[400px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-[13px] text-gray-500 text-center">
                  📄 Auto-recognition active for Indian stamp papers
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Analysis Results */}
      {analysisComplete && (
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-20">
          {/* Analysis Header */}
          <div className="flex items-center justify-between mb-8 pb-5 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🤖</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">AI Document Summary</h3>
                <p className="text-[11px] text-blue-500 font-semibold tracking-wide">PROCESSED WITH ADIKAR LEGAL ENGINE V4.2</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
              ● READY
            </div>
          </div>

          {/* Analysis Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Simple Explanation */}
              <div>
                <h4 className="text-[11px] font-bold text-gray-500 tracking-wide mb-3">SIMPLE EXPLANATION</h4>
                <div className="p-5 bg-gray-50 border-l-4 border-blue-500 rounded-lg">
                  <p className="text-sm leading-[1.7] text-gray-700">
                    This is a standard Commercial Lease Agreement for a property in Bengaluru, Karnataka. 
                    It outlines the terms of occupancy, monthly rent of ₹45,000, and a security deposit 
                    equivalent to 10 months of rent. The tenure is 11 months with a renewal option.
                  </p>
                </div>
              </div>

              {/* Important Clauses */}
              <div>
                <h4 className="text-[11px] font-bold text-gray-500 tracking-wide mb-3">IMPORTANT CLAUSES</h4>
                <div className="space-y-3">
                  {[
                    { title: 'Termination:', desc: 'Requires a 3-month written notice from either party.' },
                    { title: 'Maintenance:', desc: 'Society charges are to be borne by the tenant.' },
                    { title: 'Escalation:', desc: '5% increase in rent upon renewal after 11 months.' }
                  ].map((clause, index) => (
                    <div key={index} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                        ✓
                      </span>
                      <div className="text-[13px] leading-[1.6] text-gray-700">
                        <strong>{clause.title}</strong> {clause.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Risk Warnings */}
              <div>
                <h4 className="text-[11px] font-bold text-gray-500 tracking-wide mb-3">RISK WARNINGS</h4>
                <div className="space-y-3">
                  <div className="flex gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                    <span className="text-xl flex-shrink-0">⚠️</span>
                    <div className="text-[13px] leading-[1.6] text-gray-700">
                      The lock-in period of 11 months is unusually high for this duration. 
                      Early exit will lead to forfeiture of deposit.
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-lg">
                    <span className="text-xl flex-shrink-0">⚠️</span>
                    <div className="text-[13px] leading-[1.6] text-gray-700">
                      Arbitration clause specifies jurisdiction outside the property being in Bengaluru.
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Suggestions */}
              <div>
                <h4 className="text-[11px] font-bold text-gray-500 tracking-wide mb-3">LEGAL SUGGESTIONS</h4>
                <div className="p-5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-md text-xs font-semibold text-orange-500 mb-3">
                    💡 Actionable Insights
                  </div>
                  <ul className="m-0 pl-5 text-[13px] leading-[1.7] text-gray-700 space-y-2">
                    <li>
                      Negotiate the security deposit down to 6 months as per standard market 
                      practice in Bengaluru for small offices.
                    </li>
                    <li>
                      Request the addition of a Force Majeure clause to protect against 
                      pandemic-related lockdowns.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-semibold cursor-pointer transition-colors hover:bg-blue-600">
              <span className="text-base">⬇️</span>
              Download Summary
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-600 border border-gray-200 rounded-lg text-sm font-semibold cursor-pointer transition-colors hover:bg-gray-50">
              <span className="text-base">❓</span>
              Ask Question
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-600 border border-gray-200 rounded-lg text-sm font-semibold cursor-pointer transition-colors hover:bg-gray-50">
              <span className="text-base">📤</span>
              Share
            </button>
          </div>
        </div>
      )}

      {/* New Scan Button (Floating) */}
      {analysisComplete && (
        <button className="fixed bottom-8 right-8 px-8 py-4 bg-orange-500 text-white border-none rounded-full text-base font-semibold cursor-pointer shadow-lg transition-all hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-xl z-50">
          ➕ New Scan
        </button>
      )}
    </div>
  );
};

export default ScanDocument;
