import { CartDTO, NewCartDTO } from '../dtos/cart.dto';

export interface CartDataSource{
    create(newCart: NewCartDTO): Promise<CartDTO>;
    update(id: string, cart: NewCartDTO) : Promise<CartDTO>;
    getOne(id: string): Promise<CartDTO>;
}