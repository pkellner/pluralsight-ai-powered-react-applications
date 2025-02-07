import { createServer } from "http";
import { Server } from "socket.io";
import mockEmailsIncoming from "./app/get-emails-mock-database/mock-emails-incoming.js";

console.log("Mock emails incoming count:", mockEmailsIncoming.length);

import dotenv from 'dotenv';
dotenv.config();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  const numberOfMessagesToSend = 1000;
  const delayBetweenMessages = 10000; // 10 seconds
  let messageCount = 0; // Counter to track sent messages

  // Function to send a message
  const sendMessage = () => {
    const randomEmail =
      mockEmailsIncoming[Math.floor(Math.random() * mockEmailsIncoming.length)];

    function newGuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    socket.emit("message", {
      id: newGuid(),
      fromName: randomEmail.fromName,
      fromEmail: randomEmail.fromEmail,
      subject: randomEmail.subject,
      body: randomEmail.body,
      receivedDate: randomEmail.receivedDate,
      sentiment: randomEmail.sentiment,
      summary: randomEmail.summary,
      isHtml: randomEmail.isHtml,
    });

    messageCount += 1;
  };

  // Send the first message immediately
  sendMessage();

  const intervalId = setInterval(() => {
    if (messageCount >= numberOfMessagesToSend) {
      clearInterval(intervalId);
      console.log(
        `Stopped sending messages to ${socket.id} after ${numberOfMessagesToSend} messages.`,
      );
      scheduleShutdown();
      return;
    }

    sendMessage();
  }, delayBetweenMessages);

  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id);
    clearInterval(intervalId);
  });
});

function scheduleShutdown() {
  console.log("Attempting graceful shutdown...");
  setTimeout(() => {
    console.log("Forcing server shutdown after 15 seconds.");
    process.exit(0);
  }, 15000);
}

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});
