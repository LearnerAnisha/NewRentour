import React from 'react'
import ProductList from '../../Components/ProductList'

const Cameras = () => {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-center my-6">Cameras</h1>
            <ProductList category="Cameras" />
        </div>
    )
}

export default Cameras