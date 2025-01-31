import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface WebSocketContextType {
  connected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [connected, setConnected] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      const token = localStorage.getItem('token');
      const wsUrl =
        process.env.NODE_ENV === 'production'
          ? `wss://${window.location.host}/ws?token=${token}`
          : `ws://localhost:8080/ws?token=${token}`;

      const websocket = new WebSocket(wsUrl);

      websocket.onopen = () => {
        setConnected(true);
        console.log('WebSocket connected');
      };

      websocket.onclose = () => {
        setConnected(false);
        console.log('WebSocket disconnected');
      };

      websocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        handleWebSocketMessage(message);
      };

      setWs(websocket);

      return () => {
        websocket.close();
      };
    }
  }, [isAuthenticated, user]);

  const handleWebSocketMessage = (message: any) => {
    switch (message.event) {
      case 'task:created':
        // Dispatch event for task creation
        window.dispatchEvent(
          new CustomEvent('taskCreated', { detail: message.data })
        );
        break;
      case 'task:updated':
        window.dispatchEvent(
          new CustomEvent('taskUpdated', { detail: message.data })
        );
        break;
      case 'task:deleted':
        window.dispatchEvent(
          new CustomEvent('taskDeleted', { detail: message.data })
        );
        break;
    }
  };

  return (
    <WebSocketContext.Provider value={{ connected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
