import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Products from './components/Products'
import Cart from './components/Cart'
import Navbar from './components/Navbar'


const PRODUCT_LIST = [
  {
      stock_id: 1,
      name: 'AA Battery',
      cost: 1.99,
      image: 'https://images-na.ssl-images-amazon.com/images/I/71%2BKso958zL._AC_SL1500_.jpg'
  },
  {
      stock_id: 2,
      name: 'Blanket',
      cost: 19.99,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj0LAESkBPiaehu64TKO2jy9Iy6FtfjGjioA&usqp=CAU'
  },
  {
      stock_id: 3,
      name: 'Pringles',
      cost: 2.99,
      image: 'https://www.londondrugs.com/on/demandware.static/-/Sites-londondrugs-master/default/dw6677bbf5/products/L6716153/large/L6716153.JPG'
  },
  {
      stock_id: 4,
      name: 'Grey Backpack',
      cost: 49.99,
      image: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1596126474-matein-travel-college-backpack-1596126459.jpg?crop=1xw:0.9989304812834224xh;center,top&resize=480:*'
  }
]

const STOCK = [
  {
    id: 1,
    stock: 10
  },
  {
    id: 2,
    stock: 5
  },
  {
    id: 3,
    stock: 10
  },
  {
    id: 4,
    stock: 5
  }
]


function App() {

  const [products, setProducts] = useState(PRODUCT_LIST)
  const [cart, setCart] = useState([])
  const [inventory, setInventory] = useState(STOCK)

  const addToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => product.name === item.name
    );
    if (itemInCart) {
      itemInCart.quantity++
      console.log('ItmInCart' , itemInCart)

      //console.log('qwersthasdgh')
    } else {
      itemInCart = {
        ...product,
        quantity: 1
      };
      console.log(itemInCart)
      newCart.push(itemInCart);
    }
    console.log(newCart)
    setCart(newCart);
  };

  const reduceQty = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => product.name === item.name
    );
    if (itemInCart) {
      itemInCart.quantity--;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
        
      };
      newCart.pop(itemInCart);
    }
    setCart(newCart);
  };

  const stockAdditionHandler = (product) => {
    const productToUpdate = {...products.find(
      (item) => product.name === item.name)}
    // console.log(productToUpdate.stock + 'stock before')
    productToUpdate.stock += 1;
    // console.log(productToUpdate.stock + 'stock after')
    const newProducts = {...products.filter(
      (item) => product.name !== item.name
    )}

    console.log('new products ', newProducts)

    // setProducts([
    //   newProducts, 
    //   productToUpdate
    // ])
  }

  const stockReductionHandler = (product) => {
    const productToUpdate = {...products.find(
      (item) => product.name === item.name
    )}
    // console.log('before ' , productToUpdate.stock)
    productToUpdate.stock -= 1;
    // console.log('after ' , productToUpdate.stock)
    const newProducts = products.filter(
      (item) => product.name !== item.name
    )
    console.log('testing' , newProducts)
    setProducts([
      ...newProducts, 
      productToUpdate
    ])
  }

  const removeFromCart = (productToRemove) => {
    const removeProductsInCart = cart.filter((product) => product.name !== productToRemove.name)
    console.log('removefromCart' ,removeProductsInCart)
    setCart(removeProductsInCart) 

    const resetInventory = {...cart.find((product) => product.name === productToRemove.name)}
    console.log('productIncartToReset ', resetInventory)
    
    const newProduct = {...products.filter((product) => product.name !== productToRemove.name)}
    console.log('newley Products',newProduct)

    setProducts([newProduct, resetInventory])

  };  



  const StockResetHandler = (product) => {
    // const productInCart = {...cart.find((element) => product.name === element.name)}
    // console.log('prodRemoved ', productInCart )
    // const productsToReset = {...products.find((element) => product.name === element.name)}
    // let stockToUpdate = {...products.find(
    //   (element) => product.id === element.stock_id)}
    // if (stockToUpdate.stock) {
    //   stockToUpdate.stock =+ productInCart.stock
    // } else {
    //   stockToUpdate = productsToReset
    // }

    // console.log('stocjtoUpdate ', stockToUpdate)
    
    // setInventory(newProducts)
    
  };  

const clearCart = () => {
  // const newProd = [...products]
  // console.log(newProd + ' clearing cart..')
  // setProducts(newProd)
  
  const productsToReset = products.map((e) => {
    const stockObj = {...inventory.find((element) => element.id === e.stock_id)}
        if (stockObj.stock) {
          e.stock = stockObj.stock
        }
        return e;
      }
    )
    console.log(productsToReset + ' reseting...')
    setCart([])
    setProducts(productsToReset)
}

const combineStockToProductHandler = ()=> {
  const productsWithStock = products.map((e) => {
    const stockObj = {...inventory.find((element) => element.id === e.stock_id)}
        if (stockObj.stock) {
          e.stock = stockObj.stock
        }
        return e;
      }
    )
    // console.log(productsWithStock + ' render')
    setProducts(productsWithStock)
}
  
  useEffect(() => {
    combineStockToProductHandler()
    console.log('render')
  },[])

  return (
      <Router>
            <Navbar products={products} />
              {/* <Route path="/products" exact component={Products} /> */}
              <Route exact path="/cart" >
                <Cart 
                products={products}
                addToCart={addToCart}
                cart={cart}
                reduceQty={reduceQty}
                stockReductionHandler={stockReductionHandler}
                stockAdditionHandler={stockAdditionHandler}
                removeFromCart={removeFromCart}
                StockResetHandler={StockResetHandler} 
                clearCart={clearCart} 
                />  
              </Route>
              <Route exact path="/" exact component={Home} />
              <Route exact path="/products" >
                <Products 
                  products={products}
                  addToCart={addToCart}
                  stockReductionHandler={stockReductionHandler} />
              </Route>
      </Router>
    )
 }

export default App;
