import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
// import { useEffect, useState } from "react";

export default function Home({products}) {
  // const [data, setdata] = useState(null);

  // useEffect(() => {
  //   fetchProducts()
  // }, [])
  
  // const fetchProducts=async()=>{
  //   const data=await fetchDataFromApi("/api/products");
  //   setdata(data);
  // }

  return (
    <main>
      <HeroBanner/>
      <Wrapper>
        {/* heading pragraph start */}
        <div className="text-center max-w-[800px] mx-auto md:my-[80px]">
          <div className="text-md md:text-xl">Nike Air Max</div>
          <div className="text-[28px]  md:text-[34px] mb-5 font-semibold leading-tight">ENHANCED AIR</div>
          <div className="text-md md:text-xl">No rules. No limits. That's how Air was bottled. Now, a new point-loaded cushioning system is here to deliver even more comfort. Dropping soon</div>
        </div>
        {/* heading pragraph end */}

        {/*  products card  start */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.data?.map((product)=>(
            <ProductCard key={product.id} data={product}/>
          ))}
        {/* <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/> */}
        </div>
        {/*  products card  end */}

      </Wrapper>
    </main>
  )
}


export async function getStaticProps(){
  const products=await fetchDataFromApi("/api/products?populate=*");

  return {
    props:{products}
  }
}
