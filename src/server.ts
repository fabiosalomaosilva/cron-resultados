import app from './app'
import * as dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3333;
app.listen(port, () => console.log('CRON JOB running as ' + new Date().toTimeString() +' 🔥🔥'))