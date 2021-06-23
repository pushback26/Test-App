import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'



 function Products({ products, addToCart, stockReductionHandler }) {

    useEffect(() => {
        console.log('products render')
    }, [])

    return (
    <div 
    // className="row containter center-align"
    className="container row center-align"
    > 
        
        <h2>Products</h2>
        <div>
            <div>
            {products.map((product, idx) => (
                    <div 
                        key={idx} 
                        className="container col s3"
                        >
                        <hr />    
                        <h4>{product.name}</h4>
                        
                        <h5>${product.cost}</h5>
                        <h6>In-stock: {product.stock}</h6>
                        <div className="container">
                        <img 
                            className="responsive-img center-align" 
                            src={product.image} 
                            alt={product.name}/>
                        </div>
                        <button onClick={() => {
                            addToCart(product)
                            stockReductionHandler(product)
                        }}
                        disabled={product.stock === 0}
                        >Add to Cart</button>

                    </div>
                ))
            }
            </div>
        </div>
    </div>
    )
}

export default Products;