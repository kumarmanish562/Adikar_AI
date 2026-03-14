import { useState } from 'react';

const StreamingAskQuestion = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const handleStreamingQuestion = async () => {
    if (!inputText.trim() || isStreaming) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText
    };

    setMessages(prev => [...prev, userMessage]);
    const currentQuestion = inputText;
    setInputText('');
    setIsStreaming(true);

    // Add streaming message placeholder
    const streamingMessage = {
      id: Date.now() + 1,
      type: 'assistant',
      streaming: true,
      content: { explanation: 'Processing your question...', status: 'processing' }
    };
    setMessages(prev => [...prev, streamingMessage]);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/queries/ask-stream', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: currentQuestion,
          language: 'en'
        })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              setMessages(prev => prev.map(msg => 
                msg.id === streamingMessage.id ? {
                  ...msg,
                  content: data.type === 'answer' ? data.data : {
                    explanation: data.message || msg.content.explanation,
                    status: data.type
                  }
                } : msg
              ));

              if (data.type === 'complete') {
                setMessages(prev => prev.map(msg => 
                  msg.id === streamingMessage.id ? {
                    ...msg,
                    streaming: false
                  } : msg
                ));
              }
            } catch (e) {
              console.error('Error parsing stream data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);
      setMessages(prev => prev.map(msg => 
        msg.id === streamingMessage.id ? {
          ...msg,
          streaming: false,
          content: {
            explanation: 'Sorry, there was an error processing your question.',
            legalReferences: [],
            actionSteps: ['Try again later', 'Check your connection'],
            sources: []
          }
        } : msg
      ));
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Streaming ML Responses</h2>
      
      <div className="space-y-4 mb-6 min-h-[300px]">
        {messages.map((message) => (
          <div key={message.id} className={`p-4 rounded ${
            message.type === 'user' ? 'bg-blue-100 ml-12' : 'bg-gray-100 mr-12'
          }`}>
            {message.type === 'user' ? (
              <p>{message.text}</p>
            ) : (
              <div>
                {message.streaming && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    <span className="text-sm text-gray-600">{message.content.status}</span>
                  </div>
                )}
                <p className="mb-2">{message.content.explanation}</p>
                {message.content.actionSteps && (
                  <div className="mt-2">
                    <strong>Action Steps:</strong>
                    <ul className="list-disc list-inside">
                      {message.content.actionSteps.map((step, i) => (
                        <li key={i} className="text-sm">{step}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask your legal question..."
          className="flex-1 p-2 border rounded"
          disabled={isStreaming}
          onKeyPress={(e) => e.key === 'Enter' && handleStreamingQuestion()}
        />
        <button
          onClick={handleStreamingQuestion}
          disabled={isStreaming || !inputText.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isStreaming ? 'Streaming...' : 'Ask'}
        </button>
      </div>
    </div>
  );
};

export default StreamingAskQuestion;