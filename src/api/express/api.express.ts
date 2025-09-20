import type { Express, Request, Response } from "express";
import type { Api } from "../api.ts";
import express from "express";
import { log } from "console";

export class ApiExpress implements Api {
	private constructor(readonly app: Express) {}

	public static build() {
		const app = express();
		app.use(express.json());
		return new ApiExpress(app);
	}

	public addGetRoute(
		path: string,
		handle: (req: Request, res: Response) => Promise<void>
	): void {
		this.app.get(path, handle);
		
	}

	public addPostRoute(
		path: string,
		handle: (req: Request, res: Response) => Promise<void>
	): void {
		this.app.post(path, handle);
	}

	public start(port: number) {
		this.app.listen(port, () => {
			console.log("server running on port " + port);
			this.printRoutes();
		});
	}

	private printRoutes() {
		const router = this.app._router;

		if (!router) {
			console.log("Nenhuma rota registrada ainda.");
			return;
		}

		const routes = router.stack
			.filter((r: any) => r.route)
			.map((r: any) => ({
				path: r.route.path,
				method: r.route.stack[0].method,
			}));
		console.log(routes);
	}

	
}
