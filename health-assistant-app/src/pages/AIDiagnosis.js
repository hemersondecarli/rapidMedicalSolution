import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Axios instance
import '../styles/AIDiagnosis.css';

function AIDiagnosis() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Simulate AI "typing" effect when chat starts
        setLoading(true);
        setTimeout(() => {
            setMessages([{ text: "Hello! How are you feeling today?", user: false }]);
            setLoading(false);
        }, 1000);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessages = [...messages, { text: input, user: true }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const response = await api.post('/ai/diagnose', { symptoms: input });
            setTimeout(() => {
                setMessages([...newMessages, { text: response.data.diagnosis, user: false }]);
                setLoading(false);
            }, 1500);
        } catch (error) {
            console.error('AI Diagnosis Error:', error.response ? error.response.data : error.message);
            setMessages([...newMessages, { text: "Error processing request. Please try again later.", user: false }]);
            setLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <h1>AI Pre-Diagnosis</h1>

            {/* Hints Section */}
            <div className="hints">
                <h3>💡 You can ask:</h3>
                <ul>
                    <li>"I have a headache, what could it be?"</li>
                    <li>"I've been coughing for 3 days, should I worry?"</li>
                    <li>"I'm feeling dizzy, any idea why?"</li>
                    <li>"I have body aches and fever, what do you think?"</li>
                    <li>"My throat is sore, do I need to see a doctor?"</li>
                </ul>
            </div>

            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.user ? "chat-user" : "chat-ai"}>
                        {msg.text}
                    </div>
                ))}
                {loading && <div className="chat-ai typing">AI is thinking...</div>}
            </div>
            
            <form onSubmit={handleSubmit} className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your symptoms..."
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default AIDiagnosis;
