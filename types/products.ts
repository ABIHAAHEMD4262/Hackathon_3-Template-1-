

export interface Product{
    _id:string;
    name:string;
    _type:"products"
    image?:{
        assets:{
            _ref: string;
            _type:"image";
        }
    };
    price:number;
    description?:string;
    category:string;
    discountPercent:number;
    new:boolean;
    colors:[];
    sizes:[]


}