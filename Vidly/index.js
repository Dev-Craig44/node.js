import config from "config";
import debug from "debug";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { routes } from "./routes/index.js";
dotenv.config();

const vidlyPassword = process.env.vidly_password;
const mongodbUri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV;

const app = express();

app.use(express.json());
app.use(routes);
app.use(helmet());

const dbDebugger = debug("app:db");
const startupDebugger = debug("app:startup");

startupDebugger(`Application name: ${config.get("name")}`);
startupDebugger(`Application mail: ${config.get("mail.host")}`);
startupDebugger(`Application password: ${config.get("mail.password")}`);

app.set("view engine", "pug");
app.set("views", "./views");

startupDebugger(`Env: ${nodeEnv}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger(`Morgan enabled...`);
}

app.listen(port, () => {
  startupDebugger(`Listening on port ${port}`);
});

export { dbDebugger };
// 1. Middleware
// 2. Creating Custom Middleware
// 3. Built-in Middleware
// 4. Third party Middleware
// 5. Environments Middleware
// 6. Configuration
// 7. Debugging
// 8. Templating Engine
// 9. DB Intergration
// 10. Authentication
// 11. Structuring Express Apps

//Register: POST /api/users { name, email, password }
//Login: POST /api/logins

// email: {
//     type: String,
//     unique: true
// }
