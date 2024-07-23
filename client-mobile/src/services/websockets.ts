import io, { Socket } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;

  connect(gameId: string) {
    console.log('Attempting to connect to WebSocket server');
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected. Socket ID:', this.socket?.id);
      this.socket?.emit('joinRoom', gameId);
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server. Reason:', reason);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      console.log('Disconnecting from WebSocket server');
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }
}

export const webSocketService = new WebSocketService();