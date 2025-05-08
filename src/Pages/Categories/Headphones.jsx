import React from 'react'
import ProductList from '../../Components/ProductList'

const Headphones = () => {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-center my-6">Headphones</h1>
            <ProductList category="Headphones" />
        </div>
    )
}

export default Headphones