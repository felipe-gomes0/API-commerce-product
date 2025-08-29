import { BADFLAGS } from "dns";
import { ProductRepositoryPrisma } from "../../../repositories/product/prisma/product.repository.prisma.ts";
import type { ProductRepository } from "../../../repositories/product/product.repository";
import { ProductServiceImplementation } from "../../../services/product/implementation/product.service.implementation.ts";
import { prisma } from "../../../util/prisma.util.ts";
import type { Request, Response} from 'express';

export class ProductController {
	private constructor() {}

	public static build() {
		return new ProductController();
	}

	public async create(request: Request, response: Response) {
		const { name, price } = request.body;

		const aRepository = ProductRepositoryPrisma.build(prisma);
		const aService = ProductServiceImplementation.build(aRepository);

		const output = await aService.create(name, price);

		const data = {
			id: output.id,
			name,
			price,
			balace: output.balance,
		};

		response.status(201).json().send();
	}

	public async list(request: Request, response: Response) {
		const aRepository = ProductRepositoryPrisma.build(prisma);
		const aService = ProductServiceImplementation.build(aRepository);

		const output = await aService.getAllProducts();

		const data = {
			products: output.products,
		};

		response.status(200).json(data).send();
	}

	public async buy(request: Request, response: Response) {

		const { id } = request.params;

		const { amount } = request.body;
		if (typeof id !== "string") {
			response.status(400).json({ error: "Product id is required" }).send();
			return;
		}
		const aRepository = ProductRepositoryPrisma.build(prisma);
		const aService = ProductServiceImplementation.build(aRepository);

		const output = await aService.buy(id, amount);

		const data = {
			id: output.id,
			balance: output.balance,
		};

		response.status(200).json(data).send();
	}

	public async sell(request: Request, response: Response) {
		const { id } = request.params;
		const {  amount } = request.body;
		const aRepository = ProductRepositoryPrisma.build(prisma);
		const aService = ProductServiceImplementation.build(aRepository);

		const output = await aService.sell(id, amount);

		const data = {
			id: output.id,
			balance: output.balance,
		};

		response.status(200).json(data).send();
	}



}
