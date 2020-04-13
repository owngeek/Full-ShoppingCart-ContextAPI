import React, { Component } from 'react'
import {storeProducts, detailProduct} from "../data"

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {

state={
    products:[],
    detailProduct:detailProduct,
    cart:[],
    modalOpen:false,
    modalProduct:detailProduct,
    cartSubtotal:0,
    cartTax:0,
    cartTotal:0

}

componentDidMount (){
this.setProducts();
}

getItem = (id) =>{
    const product = this.state.products.find(item=>item.id === id)
    return product;
    }

handleDetails = (id) =>{
    const product = this.getItem(id);
    this.setState({
        detailProduct:product
    })
}

addToCart = (id) =>{
   let tempProducts=[...this.state.products]
   const index = tempProducts.indexOf(this.getItem(id))
   const product =tempProducts[index];
   product.inCart = true
   product.count = 1
   const price = product.price
   product.total = price;


this.setState({
    products:tempProducts,cart:[...this.state.cart,product]
},
()=>{this.addTotals();}
)





}
setProducts = () =>{
    let tempProducts = [];
    storeProducts.forEach(item => {
        const singleItem = {...item};
        tempProducts = [...tempProducts,singleItem];

    })
    this.setState({
        products:tempProducts
    })
}



//tester = () => {
   // console.log("state product:", this.state.products[0].inCart);
   // console.log("Data Products:",storeProducts[0].inCart);
   // const tempProducts = [...this.state.products];
   // tempProducts[0].inCart = true
  // this.setState({
  //     products:tempProducts
  // },()=>{
    //console.log("state product:", this.state.products[0].inCart);
   // console.log("Data Products:",storeProducts[0].inCart);
  // }) 
//}

openModal = (id) => {
const product = this.getItem(id)
this.setState({
    modalProduct:product,
    modalOpen:true
})
}
closeModal =(id) => {
this.setState({
    modalOpen:false
})
}



increment = (id) =>{
    let tempCart = [...this.state.cart]
    const selectedProduct = tempCart.find(item=>(item.id === id))
    const index = tempCart.indexOf(selectedProduct)
    const product= tempCart[index]
    product.count = product.count + 1
    product.total = product.count * product.price

this.setState({
cart:[...tempCart]
},()=>{
this.addTotals()
})

} 



decrement = (id) =>{
    let tempCart = [...this.state.cart]
    const selectedProduct = tempCart.find(item=>(item.id === id))
    const index = tempCart.indexOf(selectedProduct)
    const product= tempCart[index]
    product.count = product.count - 1
    if(product.count === 0){
this.removeItem(id)
    }else{
product.total = product.count * product.price

this.setState({
    cart:[...tempCart]
    },()=>{
    this.addTotals()
    })
    
   

    }


} 
removeItem = (id) =>{
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index]
    removedProduct.inCart = false
    removedProduct.count = 0
    removedProduct.total = 0

this.setState({
    cart:[...tempCart],
    product:[...tempProducts]
},()=>{
    this.addTotals()
})

}

clearCart = (id) =>{
    
this.setState({
cart:[]   
    },()=>{
        this.setProducts();
        this.addTotals();
    })

}

addTotals = () =>{
 let subTotal = 0;
 this.state.cart.map(item =>(subTotal += item.total)) 
 const tempTax = subTotal * 0.1;
 const tax = parseFloat(tempTax.toFixed(2));
 const total  = subTotal + tax  

this.setState({
    cartSubtotal:subTotal,
    cartTax:tax,
    cartTotal:total

})


}
    render() {
        return (
           <ProductContext.Provider value={{
...this.state,
handleDetails : this.handleDetails,
addToCart : this.addToCart,
openModal:this.openModal,
closeModal:this.closeModal,
increment: this.increment,
decrement:this.decrement,
removeItem:this.removeItem,
clearCart:this.clearCart

           }}>
               {this.props.children}


           </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export  { ProductProvider, ProductConsumer };