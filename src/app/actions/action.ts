
import { Product } from "../../../types/products";
import { client } from "@/sanity/lib/client"; 

export const getAllProducts = async () => {
    const query = `*[_type == "products" ]{
        _id,
        name,
        price,
        discountPercent,
        image,
        description,
        category,
        colors,
        sizes,
        new,
        slug
      }`;
    const products = await client.fetch(query);
    return products;
};



export const addToCart =(product:Product)=>{
    const cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')

    const existingProduuctIndex = cart.findIndex(item=> item._id === product._id)

    if(existingProduuctIndex > -1){
        cart[existingProduuctIndex].inventory += 1
    }
    else {
        cart.push({
            ...product, inventory: 1
        })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const removeCartItem =(productId:string) => {
    let cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
    cart = cart.filter(item => item._id!== productId)
    localStorage.setItem('cart' , JSON.stringify(cart))
}

export const updateCartQuantity = (productId:string , quantity: number) => {
    const cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
    const productIndex = cart.findIndex(item => item._id === productId)

    if(productIndex > -1){
        cart[productIndex].inventory= quantity
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

export const getCartItems =() : Product[]=>{
   return JSON.parse(localStorage.getItem('cart') || '[]')
}