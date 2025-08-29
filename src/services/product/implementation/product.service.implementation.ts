import { Product } from "../../../entities/product";
import type { ProductRepository } from "../../../repositories/product/product.repository";
import type {
	BuyOutputDto,
	CreateOutputDto,
	GetAllProductsOutputDto,
	ProductService,
	SellOutputDto,
} from "../product.services";

export class ProductServiceImplementation implements ProductService {
	private constructor(readonly repository: ProductRepository) {}

	public static build(repository: ProductRepository) {
		return new ProductServiceImplementation(repository);
	}

	public async create(name: string, price: number): Promise<CreateOutputDto> {
		const aProduct = Product.create(name, price);

		this.repository.save(aProduct);

		const output: CreateOutputDto = {
			id: aProduct.id,
			balance: aProduct.quantity,
		};

		return output;
	}

	public async sell(id: string, amount: number): Promise<SellOutputDto> {
		const product = await this.repository.findById(id);

		if (!product) {
			throw new Error("Product not found");
		}

		product.removeStock(amount);

		await this.repository.update(product);
		const output: SellOutputDto = {
			id: product.id,
			balance: product.quantity,
		};
		return output;
	}

	public async buy(id: string, amount: number): Promise<BuyOutputDto> {
		const product = await this.repository.findById(id);

		if (!product) {
			throw new Error("Product not found");
		}

		product.addStock(amount);

		await this.repository.update(product);
		const output: BuyOutputDto = {
			id: product.id,
			balance: product.quantity,
		};

		return output;
	}

	public async getAllProducts(): Promise<GetAllProductsOutputDto> {
		const aProducts = await this.repository.list();

		const products = aProducts.map((product) => ({
			id: product.id,
			name: product.name,
			price: product.price,
			quantity: product.quantity,
		}));

		const output: GetAllProductsOutputDto = {
			products,
		};

		return output;
	}
}
