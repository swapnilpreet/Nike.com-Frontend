export const getDiscountedPricePercentage=(original_price,discounted_Pirce) =>{
     const calculateDiscount=original_price-discounted_Pirce;
     
     const DiscountInPercentage=(calculateDiscount/original_price)*100;

     return DiscountInPercentage.toFixed(2)
}