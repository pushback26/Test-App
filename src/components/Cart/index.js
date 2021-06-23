import React from 'react'


export default function Cart({ cart, addToCart, reduceQty, stockReductionHandler, stockAdditionHandler, removeFromCart, StockResetHandler, clearCart }) {

    return (
        <div className="container row center-align">
            
            <h2>Cart</h2>
            <hr/>
            
                <button onClick={() => {
                    clearCart()}}
                >Clear Cart</button>
            
            <div>
                {cart.map((product, idx) => (
                  <div className="container col s3" key={idx}>
                        <h4>{product.name}</h4>
                        <button 
                            onClick={() => {
                                addToCart(product) 
                                stockReductionHandler(product)
                            }}
                            disabled={product.quantity >= product.stock}
                        > + </button>
                        <h6>Quantity: {product.quantity}</h6>
                        <button 
                            onClick={() => {
                                reduceQty(product)
                                stockAdditionHandler(product.name)
                            }} 

                        disabled={product.quantity === 1}
                        > - </button>
                        
                        <h6> Price: ${product.cost}</h6>
                        <div className="container">
                            <img className="responsive-img center-align"
                            src={product.image} 
                            alt={product.name} />
                        </div>
                        <button onClick={() => {
                        removeFromCart(product) 
                        // StockResetHandler(product)
                        }}>Remove</button>  
                  </div>  
                ))}
            </div>

        </div>
    )
}