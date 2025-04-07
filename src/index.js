import { ininMongoConnection } from "./db/initMongoConnection.js";
import { setupServer } from "./server.js";
await ininMongoConnection();
setupServer();