// src/app/api/createOrder/route.ts
import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';
import { CartItem } from '../../../../types/products'; // Import the CartItem type

export async function POST(request: Request) {
  try {
    const { shippingDetails, cartItems, total, discount } = await request.json();

    // Create a new order document in Sanity
    const order = await client.create({
      _type: 'order',
      ...shippingDetails, // Spread shipping details (firstName, lastName, email, etc.)
      cartItems: cartItems.map((item: CartItem) => ({
        _key: Date.now().toString(), // Add a unique key
        product: { _type: 'reference', _ref: item._id }, // Reference to the product
        name: item.name, // Product name
        image: item.image, // Product image
        price: item.price, // Product price
        quantity: item.inventory, // Quantity of the product in the cart
      })),
      total, // Total amount of the order
      discount, // Discount applied (if any)
      status: 'pending', // Default status
    });

    // Send success response
    return NextResponse.json(
      { message: 'Order created successfully!', order },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { message: 'Failed to create order' },
      { status: 500 }
    );
  }
}