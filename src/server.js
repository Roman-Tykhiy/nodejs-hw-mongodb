import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger.js";
import { getEnVar } from "./utils/getEnVar.js";
import contactsRouter from "./routers/contacts.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
export const setupServer = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(logger);
    app.use("/contacts", contactsRouter)
    app.use(notFoundHandler);
    app.use(errorHandler);
    const port = Number(getEnVar("PORT", 3000));
    app.listen(port, () => console.log(`Server running on ${port} port`));
};