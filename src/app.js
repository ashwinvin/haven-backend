import dotenv from "dotenv";
import fastify from "fastify";

import utility from "./plugins/utility.js";
import database from "./plugins/database.js";
import middleware from "./plugins/middleware.js";

import userCreate from "./routes/user/create.js";

// Loading environment variables
dotenv.config();
process.env.DEBUG_MODE = process.env.DEBUG_MODE === "true";
process.env.PRODUCTION = process.env.PRODUCTION === "true";

// Fastify webserver instance
const app = fastify({
  logger: true
});

// Asynchronous tasks
(async () => {

  // Initialize plugins
  app.register(utility);
  app.register(database);
  app.register(middleware);

  // Register endpoints
  app.register(userCreate);

  // Run the webserver
  await app.listen(process.env.PORT);

})();

export { app }
