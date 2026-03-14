import { useState } from 'react';
import axios from 'axios';

const MLTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testML = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/test-ml');
      setTestResult(response.data);
    } catch (error) {
      setTestResult({ status: 'error', error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testWithAuth = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log('Using token:', token ? 'Token exists' : 'No token');
      
      const response = await axios.post(
        '/api/queries/ask',
        {
          question: "What are my rights if I am arrested?",
          language: "en"
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Full API Response:', response.data);
      
      setTestResult({ 
        status: 'success', 
        answer_length: response.data.answer?.length || 0,
        explanation_length: response.data.explanation?.length || 0,
        sources: response.data.sources?.length || 0,
        action_steps: response.data.actionSteps?.length || 0,
        full_answer: response.data.answer?.substring(0, 200) + '...',
        full_explanation: response.data.explanation?.substring(0, 200) + '...'
      });
    } catch (error) {
      console.error('API Error:', error);
      setTestResult({ 
        status: 'auth_error', 
        error: error.response?.data?.detail || error.message 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">ML Engine Test & Debug</h2>
      
      <div className="space-y-4">
        <button
          onClick={testML}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test ML (No Auth)'}
        </button>
        
        <button
          onClick={testWithAuth}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 ml-2"
        >
          {loading ? 'Testing...' : 'Test ML (With Auth)'}
        </button>
      </div>

      {testResult && (
        <div className="mt-6 p-4 border rounded">
          <h3 className="font-bold mb-2">Test Result:</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto max-h-96">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default MLTest;