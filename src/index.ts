import { APP_CONFIG } from "./config/app.config";
import databaseSetup from "./setup/database";
import { app } from "./setup/server";

const startServer = async () => {
  try {
    app.listen(APP_CONFIG.PORT, () => {
      console.log(`Server is running on port ${APP_CONFIG.PORT}`);
    });

    try {
      await databaseSetup.authenticate();
      await databaseSetup.sync();
      console.log("Database connected successfully");
    } catch (err) {
      console.log("Database connection failed:", err);
      throw err;
    }
  } catch (err) {
    console.log("Failed to start server:", err);
    process.exit(1);
  }
};
startServer();
