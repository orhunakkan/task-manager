import WebSocket from 'ws';
import { Server } from 'http';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth';
import logger from '../config/logger';

interface WebSocketClient extends WebSocket {
  userId?: string;
  isAlive?: boolean;
}

class WebSocketService {
  private wss: WebSocket.Server | null;
  private clients: Map<string, Set<WebSocketClient>>;

  constructor(server: Server | null) {
    this.clients = new Map();

    // Initialize WebSocket server
    if (server) {
      this.wss = new WebSocket.Server({ server });
      this.wss.on('connection', this.handleConnection.bind(this));

      // Ping clients every 30 seconds to keep connections alive
      setInterval(() => {
        this.wss?.clients.forEach((client: WebSocketClient) => {
          if (!client.isAlive) {
            client.terminate();
            return;
          }
          client.isAlive = false;
          client.ping();
        });
      }, 30000);
    } else {
      this.wss = null;
    }
  }

  private handleConnection(ws: WebSocketClient, req: any) {
    ws.isAlive = true;

    // Extract token from query string
    const url = new URL(req.url, 'ws://localhost');
    const token = url.searchParams.get('token');

    if (!token) {
      ws.close(1008, 'Authorization required');
      return;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      ws.userId = decoded.userId;

      // Add client to clients map
      if (!this.clients.has(decoded.userId)) {
        this.clients.set(decoded.userId, new Set());
      }
      this.clients.get(decoded.userId)?.add(ws);

      logger.info(`WebSocket client connected: ${decoded.userId}`);
    } catch (error) {
      ws.close(1008, 'Invalid token');
      return;
    }

    ws.on('pong', () => {
      ws.isAlive = true;
    });

    ws.on('close', () => {
      if (ws.userId) {
        this.clients.get(ws.userId)?.delete(ws);
        if (this.clients.get(ws.userId)?.size === 0) {
          this.clients.delete(ws.userId);
        }
      }
      logger.info(`WebSocket client disconnected: ${ws.userId}`);
    });
  }

  public notifyUser(userId: string, event: string, data: any) {
    const userClients = this.clients.get(userId);
    if (userClients) {
      const message = JSON.stringify({ event, data });
      userClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  }

  public notifyUsers(userIds: string[], event: string, data: any) {
    userIds.forEach((userId) => this.notifyUser(userId, event, data));
  }
}

export default WebSocketService;
