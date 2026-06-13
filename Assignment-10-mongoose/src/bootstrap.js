import { configEnv } from './configs/env.js';
import { ConnectDB } from './DB/connection.js';
import globalErrorHandler from './utils/error-handler/global-error.js';

const urlBase = configEnv.urlApiBase;

export default async function bootstrap(app, express) {
	app.use(express.json());

   await ConnectDB();
   
   

	app.use(globalErrorHandler);
}
