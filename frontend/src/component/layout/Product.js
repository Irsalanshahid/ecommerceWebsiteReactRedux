import React from 'react'
import {Link} from 'react-router-dom'

const Product = ({product}) => {
  return (
    <Link to={product._id} className="max-w-[14vmax] border-solid border-blue-400 border flex flex-col">
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <span>{product.price}</span>
    </Link>
    
  )
}

export default Product