import CartItem from "@/components/CartItems";
import Wrapper from "@/components/Wrapper";
import { makePaymentRequest } from "@/utils/api";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
const stripePromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHBLE_KEY)

const Cart = () => {
  const [loading, setloading] = useState(false)
  const {cartItems} =useSelector(state => state.cart)
  console.log(cartItems)
  const subTotal=useMemo(()=>{
     return cartItems.reduce((total,val)=>total+val.attributes.price,0)
  },[cartItems])

  const handlePayment=async()=>{
    try {
      setloading(true);
      const stripe = await stripePromise;
      const res = await makePaymentRequest("/api/orders", {
          products: cartItems,
      });
      await stripe.redirectToCheckout({
          sessionId: res.stripeSession.id,
      });
  } catch (error) {
    setloading(false);
      console.log(error);
  }
  }
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {/* heading pragraph start */}
        {cartItems?.length>0 ? (
        <>
        <div className="border text-center  max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {" "}
            Shopping Cart
          </div>
        </div>
        {/* heading pragraph end */}
        {/* cart content start */}
        <div className=" border flex flex-col lg:flex-row gap-12 py-10">
          {/* cart item start */}
          <div className="border flex-[2]">
            <div className="text-lg font-bold">Cart Items</div>
            {cartItems?.map((product)=>(
            <CartItem key={product.id} data={product}/>
          ))}
            {/* <CartItems />
            <CartItems />
            <CartItems />
            <CartItems /> */}
          </div>
          {/* cart item end */}
          {/* summery start */}
          <div className="border flex-[1]">
            <div className="text-lg font-bold">summery</div>

            <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
              <div className="flex justify-between">
                <div className="uppercase text-md md:text-lg font-medium text-black">
                  Subtotal
                </div>
                <div className="text-md md:text-lg font-medium text-black">
                  &#8377;{subTotal}
                </div>
              </div>
              <div className="text-sm md:text-md py-5 border-t mt-5">
                The subTotal reflects the total price of your order, including
                duties and taxes ,before
              </div>
            </div>
            <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center" onClick={handlePayment}>
              Checkout
              {/* <img src='/spinner.svg'/> */}
              {loading && <img src='/spinner.svg'/>}
            </button>
          </div>
          {/* summery end */}
        </div>
        </>
        ):(
        <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
          <Image src='/empty-cart.jpg' width={300} height={300} className="w-[300px] md:w-[400px]"/>
          <span className="text-xl font-bold">Your cart is empty</span>
          <span className="text-center mt-4">
            looks like you have not added anything in your cart yet
            <br />
            Go ahead and explore top categories
          </span>
          <Link href='/'
          className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-tranform active:scale-95 mb-3 hover:opacity-75 mt-8">Continue Shopping
          </Link>
        </div>
        )}

        {/* cart content end */}

        {/* empty scren cart */}
        {/* empty scren cart */}
      </Wrapper>
    </div>
  );
};

export default Cart;
