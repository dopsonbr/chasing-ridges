export interface Product {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly image: string;
  readonly category: string;
  readonly subCategory: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
