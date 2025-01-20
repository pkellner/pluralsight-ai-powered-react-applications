const { createServer } = require("http");
const { Server } = require("socket.io");
const { ImapFlow } = require("imapflow");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins for simplicity; configure for production.
  },
});

// IMAP configuration
const imapConfig = new ImapFlow({
  host: "imap.mail.me.com",
  port: 993,
  secure: true,
  auth: {
    user: "svcodecamp@icloud.com",
    pass: process.env.SVCODECAMP_PASSWORD,
  },
  logger: false,
});

const imapClient = new ImapFlow(imapConfig);

imapClient.on("close", async (hadError) => {
  console.log(
    `IMAP connection closed${
      hadError ? " due to an error" : ""
    }. Reconnecting...`,
  );
  try {
    await imapClient.connect();
    console.log("Reconnected to IMAP server.");
  } catch (error) {
    console.error("Failed to reconnect:", error);
  }
});

io.on("connection", async (socket) => {
  console.log("A client connected:", socket.id);

  try {
    if (!imapClient.usable && !imapClient.locked) {
      await imapClient.connect();
    }

    console.log("Connected to IMAP server. Listening for new emails.");

    imapClient.on("exists", async (mailbox) => {
      console.log("New email detected");

      const messageSequence = (await imapClient.status(mailbox, ["messages"]))
        .messages;
      const message = await imapClient.fetchOne(messageSequence, {
        envelope: true,
        source: true,
      });

      const date = message.envelope.date;
      const subject = message.envelope.subject;
      const body = message.source.toString();

      socket.emit("message", { date, subject, body });
    });
  } catch (err) {
    console.error("Error:", err);
  }

  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id);
  });
});

const PORT = 5500;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});
