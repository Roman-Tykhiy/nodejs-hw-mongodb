import express from "express";
import cors from "cors";
import pino from "pino-http";
import { getEnVar } from "./utils/getEnVar.js";
import { getContacts, getContactsById } from "./services/contacts.js";

export const setupServer = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(pino({
        transport: {
            target: "pino-pretty"
        }
    }));
    app.get("/api/contact", async (req, res) => {
        const data = await getContacts();     
        res.json({
            status: 200,
            message: "Successfully find contact",
            data,
             
        })
    });
    app.get("/api/contact/:id", async (req, res) => {
        const { id } = req.params;
        const data = await getContactsById(id);
        if (!data) {
            return res.status(404).json({
                status: 404,
                message: `Contact with id=${id} not found`
            });
        }
        res.json({
            status: 200,
            message: `Successfully find contact with id=${id}`,
            data,
             
        })

    })
    app.use((req, res) => {
        res.status(404).json({
            message: `${req.url} not found`
        });
    });
    app.use((req, res) => {
        res.status(500).json({
            message: error.message,
        });
    });
    const port = Number(getEnVar("PORT", 3000));
    app.listen(port, () => console.log(`Server running on ${port} port`));
};