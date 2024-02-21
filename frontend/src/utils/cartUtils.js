export const addDecimals = (num) =>{
    return( Math.round(num * 100)/100 ).toFixed(2)
}


export const  updateCart = ( state ) =>{
       // calculate the ItemsPrice

       state.itemsPrice = addDecimals( state.cartItems.reduce((accumulator, item)=>{
        return accumulator + item.price * item.qty
    }, 0))
     
    console.log(state.cartItems[0].qty)
    console.log(' this is the price of the items : ' , state.itemsPrice)


    // calculate the shippingPrice (if order is above 100$ then it is free, else it will be $10 shipping)

    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10 )
    
    // calculate the taxPrice (15% tax)
    state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2))  

    // calculate the totalPrice

    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2)

    localStorage.setItem('cart', JSON.stringify(state))

    return state
 
}