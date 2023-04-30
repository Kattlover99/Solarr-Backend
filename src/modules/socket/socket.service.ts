import { Injectable } from '@nestjs/common';
import { WebSocket } from 'ws';

@Injectable()
export class SocketService {
  private websocket = null;
  constructor() {
    this.connect();
  }

  connect() {
    this.websocket = new WebSocket(process.env.AWS_WEBSOCKET_URL || '');
    this.websocket.onclose = ({ wasClean, code, reason }) => {
      console.log(
        `onclose:   ${JSON.stringify({
          wasClean,
          code,
          reason
        })} Reconnect will be attempted in 1 second.`
      );
      setTimeout(() => {
        this.connect();
      }, 1000);
    };

    this.websocket.onerror = (error) => {
      console.log(error);
      console.log('onerror:   An error has occurred. See console for details.');
      setTimeout(() => {
        this.connect();
      }, 1000);
    };

    this.websocket.onmessage = (data) => {
      console.log(`onmessage: ${data}`);
    };

    this.websocket.onopen = () => {
      console.log('onopen:    Connected successfully.');
      this.send({ broadcast: true });
    };
  }

  send(data) {
    console.log(`server:    Sending a message. ${data.userId}`);
    const message = { action: 'routeA', data };
    this.websocket.send(JSON.stringify(message));
  }

  disconnect() {
    console.log('client:    Closing the connection.');
    this.websocket.close();
  }
}
