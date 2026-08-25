import React, { useEffect, useRef, useState } from 'react';
import { ChatDotsFill, XLg, SendFill, Robot } from 'react-bootstrap-icons';

const SUGGESTED_QUESTIONS = [
  "What are his key skills?",
  "Tell me about his work experience",
  "What's he currently building?",
  "How do I get in touch?"
];

const MAX_INPUT_LENGTH = 500;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setMessages([...nextMessages, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const retryLast = () => {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      setError(null);
      setMessages(prev => prev.filter((m, idx) => idx !== prev.length - 1 || m.role !== 'user'));
      sendMessage(lastUserMessage.content);
    }
  };

  return (
    <>
      <button
        type="button"
        className={`ai-chat-fab ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close AI assistant' : 'Ask the AI assistant about Teekay'}
        aria-expanded={isOpen}
      >
        <span className="ai-fab-ring" aria-hidden="true"></span>
        <span className="ai-fab-icon">
          {isOpen ? <XLg size={22} /> : <ChatDotsFill size={22} />}
        </span>
      </button>

      <div className={`ai-chat-panel ${isOpen ? 'is-open' : ''}`} role="dialog" aria-label="AI assistant chat" aria-hidden={!isOpen}>
        <div className="ai-chat-header">
          <div className="ai-chat-header-avatar">
            <Robot size={18} />
          </div>
          <div className="ai-chat-header-text">
            <h4>Ask about Teekay</h4>
            <span>AI assistant &middot; powered by Groq</span>
          </div>
          <button type="button" className="ai-chat-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
            <XLg size={16} />
          </button>
        </div>

        <div className="ai-chat-messages">
          {messages.length === 0 && !isLoading && (
            <div className="ai-chat-empty">
              <p>Hi, I'm here to answer questions about Teekay's skills, experience, and projects. Try one below, or ask your own.</p>
              <div className="ai-suggested-chips">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button key={q} type="button" className="ai-suggested-chip" onClick={() => sendMessage(q)}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`ai-msg ai-msg-${msg.role}`}>
              {msg.role === 'assistant' && (
                <span className="ai-msg-avatar"><Robot size={14} /></span>
              )}
              <p>{msg.content}</p>
            </div>
          ))}

          {isLoading && (
            <div className="ai-msg ai-msg-assistant">
              <span className="ai-msg-avatar"><Robot size={14} /></span>
              <span className="ai-typing" aria-label="Assistant is typing">
                <span></span><span></span><span></span>
              </span>
            </div>
          )}

          {error && (
            <div className="ai-chat-error">
              <p>{error}</p>
              <button type="button" onClick={retryLast}>Try again</button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form className="ai-chat-input-row" onSubmit={handleSubmit}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about Teekay..."
            rows={1}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send message">
            <SendFill size={15} />
          </button>
        </form>
        <p className="ai-chat-disclaimer">AI-generated answers about Teekay's background. For hiring inquiries, use the contact form.</p>
      </div>
    </>
  );
};

export default ChatWidget;
