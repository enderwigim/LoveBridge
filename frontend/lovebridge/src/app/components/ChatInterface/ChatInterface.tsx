// components/ChatInterface.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './ChatInterface.module.scss';
import { getConversation, sendMessageToApi, ChatMessage } from '../../../services/chatService';

interface Profile {
  avatar?: string;
}

interface ChatUser {
  id: number;
  username: string;
  profile?: Profile | null;
}

interface Props {
  user?: ChatUser;
  couple?: ChatUser;
  token: string;
}

const fallbackUser: ChatUser = {
  id: 1,
  username: 'Tú',
  profile: { avatar: '/img/default.jpg' },
};

const fallbackCouple: ChatUser = {
  id: 2,
  username: 'Alex',
  profile: { avatar: '/img/default.jpg' },
};

export default function ChatInterface({ user = fallbackUser, couple = fallbackCouple, token }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const response = await getConversation(user.id, couple.id, token);
      setMessages(response);
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
    }
  };

  const sendMessage = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const newMessage = await sendMessageToApi(user.id, couple.id, content, token);
      setMessages((prev) => [...prev, newMessage]);
      setContent('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <section className="chat-section py-5">
      <div className="container">
        <div className="row g-0" style={{ minHeight: '500px' }}>
          <div className="col-md-12">
            <div className="card h-100" style={{ backgroundColor: 'var(--cloud-white)', color: 'var(--deep-cocoa)' }}>
              <div className="d-flex flex-column h-100">
                <div className="card-header d-flex align-items-center" style={{ backgroundColor: 'var(--soft-peach)', color: 'var(--deep-cocoa)' }}>
                  <Image src={couple.profile?.avatar || '/img/default.jpg'} alt={couple.username} className="rounded-circle me-3" width={40} height={40} />
                  <strong>Chat con {couple.username}</strong>
                </div>

                <div ref={chatRef} className="card-body chat-window overflow-auto flex-grow-1" style={{ backgroundColor: 'var(--cloud-white)', color: 'var(--deep-cocoa)', maxHeight: '400px' }}>
                  {messages.length === 0 ? (
                    <p className="text-center">No hay mensajes aún</p>
                  ) : (
                    messages.map((msg, i) => {
                      const isMe = msg.sender_id === user.id;
                      const avatar = isMe ? user.profile?.avatar : couple.profile?.avatar;
                      const date = new Date(msg.sent_at);
                      const formattedTime = date.toLocaleString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                      });
                      return (
                        <div className="d-flex align-items-start mb-3" key={i}>
                          <Image
                            src={avatar || '/img/default.jpg'}
                            alt={isMe ? 'Tú' : couple.username}
                            className="rounded-circle me-2"
                            width={40}
                            height={40}
                          />
                          <div>
                            <strong>{isMe ? 'Tú' : couple.username}:</strong>
                            <br />
                            {msg.content}
                            <div className="text-muted small">{formattedTime}</div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="card-footer p-3 border-top">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Escribe tu mensaje..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      disabled={loading}
                    />
                    <button className="btn btn-outline-dark" type="button" onClick={sendMessage} disabled={loading}>
                      Enviar
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

