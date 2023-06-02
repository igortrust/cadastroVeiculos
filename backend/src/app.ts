import "./bootstrap";
import express from 'express';
import bodyParser from 'body-parser';
import routes from "./routes";


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes)

app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT}`)
});

export default app;