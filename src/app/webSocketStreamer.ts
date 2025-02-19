class WebSocketStreamer {
  private socket: WebSocket;
  private url: string;

  constructor(url: string) {
    this.url = url;
    this.socket = new WebSocket(url);
  }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.onopen = () => resolve();
      this.socket.onerror = (err) => reject(err);
    });
  }

  public sendMessage(message: string): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  }

  public onMessage(callback: (data: string) => void): void {
    this.socket.onmessage = (event) => callback(event.data);
  }

  public close(): void {
    this.socket.close();
  }
}

// Usage Example
(async () => {
  const streamer = new WebSocketStreamer("wss://example.com/socket");
  await streamer.connect();
  console.log("Connected to WebSocket");

  streamer.onMessage((data) => {
    console.log("Received:", data);
  });

  streamer.sendMessage("Hello Server!");
})();