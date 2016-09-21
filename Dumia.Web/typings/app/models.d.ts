interface Product {
    ProductID: number;
    Price: number;
}

interface Inventory {
    Product: Product;
    Quantity: number;
}

interface Cart {
    Items: Item[]
}

interface Item {
    Product: Product;
    Quantity: number;
}