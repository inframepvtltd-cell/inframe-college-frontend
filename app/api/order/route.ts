import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';
// import { NextResponse } from "next/server";

export async function GET() {
  const courses = [
    { slug: "interior-design/bdes-in-interior-design" },
    { slug: "fashion-design/bdes-in-fashion-design" },
    { slug: "graphic-design/bdes-in-graphic-design" },
    { slug: "uiux-design/bdes-in-ui-ux-design" }
  ];
  return NextResponse.json(courses);
}

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  const { amount } = await request.json() as { amount: string };

  const options = {
    amount: amount,
    currency: 'INR', // Default
    receipt: 'rcp1',
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log(order);
    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Order creation failed' }, { status: 500 });
  }
}
