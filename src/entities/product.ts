export type ProductProps = {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export class Product {
    private constructor (readonly props: ProductProps) {

    }

    public static create (name: string, price: number) {
        return new Product({
            id: crypto.randomUUID().toString(),
            name,
            price,
            quantity: 0
        })
    }

    public static with(id: string, name: string, price: number, quantity: number) {
        return new Product({
            id,
            name,
            price,
            quantity
        })
    }

    public get id () {
        return this.props.id
    }

    public get name () {
        return this.props.name
    }

    public get price () {
        return this.props.price
    }

    public get quantity () {
        return this.props.quantity
    }

    public addStock (amount: number) {
        this.props.quantity += amount;
    }

    public removeStock (amount: number) {
        if (amount > this.props.quantity) {
            throw new Error('O estoque é insuficiente');
        }
        this.props.quantity -= amount;
    }


}