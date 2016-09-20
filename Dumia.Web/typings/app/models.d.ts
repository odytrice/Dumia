interface Product {

}

interface Query {
    UniqueNo: string;
    Longitude: number;
    Latitude: number;
    Location?: string;
    Source: string;
}

interface Report {
    UniqueNo: string;
    Product: string;
    Location: string;
    Manufacturer: string;
}