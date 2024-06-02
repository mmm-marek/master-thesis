import Medusa from "@medusajs/medusa-js";

export const medusa = new Medusa({
    baseUrl: process.env.BACKEND_URL || "http://localhost:9000",
    maxRetries: 3,
});
