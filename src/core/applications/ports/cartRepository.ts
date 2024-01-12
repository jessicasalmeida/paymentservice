import {Carrinho} from "../../domain/carrinho";

export interface CartRepository {
    getProductsByCategory(category: string): Promise<Produto>;
    personalizeItens(personalize: string): Promise<Produto>;
    resumeCart(product: Produto) : Promise<Produto>;
    closeCart(product: Produto) : Promise<Produto>;
    payCart(id: string, product: Produto): Promise<Produto>;
    updateCartToOrder(id: string): Promise<Produto>;
    getProducts(): Promise<Produto[]>;
}