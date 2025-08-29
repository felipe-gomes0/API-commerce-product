export type SellOutputDto = {
	id: string;
	balance: number;
};

export type BuyOutputDto = {
	id: string;
	balance: number;
};
export type CreateOutputDto = {
	id: string;
	balance: number;
};

export type GetAllProductsOutputDto = {
	products: {
		id: string;
		name: string;
		price: number;
		quantity: number;
	}[];
};

export interface ProductService {
	sell(id: string, amount: number): Promise<SellOutputDto>;
	buy(id: string, amount: number): Promise<BuyOutputDto>;
	getAllProducts(): Promise<GetAllProductsOutputDto>;
    create(name: string, price: number) : Promise<CreateOutputDto>
} 
