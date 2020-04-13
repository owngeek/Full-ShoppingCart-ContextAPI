import React, { Component } from 'react'
import Product from "./Product"
import Title from "./Title"
import {ProductConsumer} from "../components/context"
export default class ProductList extends Component {



    render() {
        
        return (
            <div>
        
<div className="container py-5">
<Title name="our" title="products"/>
    <div className="row">
<ProductConsumer>
{(value)=>{
return value.products.map(product=>{
    return <Product
    key = {product.id}
    product={product}
    />
})



}}
    
</ProductConsumer>


    </div>
</div>






         

            </div>
        )
    }
}
