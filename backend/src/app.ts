import "./bootstrap";
import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import routes from "./routes";


const app = express();
app.use(
    cors({
        credentials: true,
        origin: [
            "http://localhost:4200",
        ],
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes)
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
});

export default app;