export const addDecimals = (num) =>{
    return( Math.round(num * 100)/100 ).toFixed(2)
}


export const  updateCart = ( state ) =>{
       // calculate the ItemsPrice

       const ItemsPrice =  state.cartItems.reduce((accumulator, item)=>{
        return accumulator + item.price * item.qty
    }, 0)

       state.itemsPrice = addDecimals(ItemsPrice)
       console.log(' this is the price of the items : ' , state.itemsPrice)


    // calculate the shippingPrice (if order is above 100$ then it is free, else it will be $10 shipping)
    const ShippingPrice = ItemsPrice > 100 ? 0 : 10
    state.shippingPrice = addDecimals(ShippingPrice )
    
    // calculate the taxPrice (15% tax)
    const TaxPrice = Number(ItemsPrice * 0.15).toFixed(2)
    state.taxPrice = addDecimals(TaxPrice)  
   
    // calculate the totalPrice

    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2)

    localStorage.setItem('cart', JSON.stringify(state))

    return state
 
}