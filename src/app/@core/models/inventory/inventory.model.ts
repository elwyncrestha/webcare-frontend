import { BaseEntity } from '../../base/models';

export class Inventory extends BaseEntity {
    name?: string;
    price?: number;
    quantity?: number;
    totalPrice?: number;
    purchaseDate?: Date;
}
