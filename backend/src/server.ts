import express from 'express';
import * as dotenv from 'dotenv';
import { router } from './router';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/exames', express.static("src/uploads"));

app.use(router);



app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));