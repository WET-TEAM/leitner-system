import express from "express";
import bodyParser from "body-parser";
import cardRoutes from "./infrastructure/web/routes/cardRoutes";

const app = express();

app.use(bodyParser.json());
app.use(cardRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});