import {Hono} from "hono";
import {logger} from "hono/logger";
import {expensesRoute} from "./routes/expenses";
import {serveStatic} from "hono/bun";
import { cors } from 'hono/cors'

const app = new Hono();

app.use("*", logger());
app.use('http://localhost:5173/', cors())

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute)

app.get('*', serveStatic({root: '/frontend/dist'}))
app.get('*', serveStatic({path: '/frontend/dist/index.html'}))

export default app;
export type apiRoutes = typeof apiRoutes
