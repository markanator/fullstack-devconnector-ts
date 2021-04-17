import * as dotenv from "dotenv";
import app from "./server";
dotenv.config();

const PORT = parseInt(process.env.PORT as string) || 8080;

app.listen(PORT, () => {
  console.log(`=== SERVER STARTED ON http://localhost:${PORT} ===`);
});
