import {type apiRoutes} from "@server/app.ts";
import { hc } from "hono/client"

const client = hc<apiRoutes>('/')

export const api = client.api