import { Fragment, React, useEffect } from 'react';
import Product from './Product';
import { fetchProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader/Loader'

const Home = () => {
  const product = {
    name: 'blue shirt',
    images: [{ url: 'https://i.ibb.co/DRST11n/1.webp' }],
    price: 'Rs. 250',
    _id: 'ali',
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { products, loading, error } = useSelector((state) => state.products);
  {
    console.log(products);
  }
  return (
    <Fragment>
      {loading ? (
        <Fragment>
          <Loader />
        </Fragment>
      ) : (
        <div className="container border-solid border border-red-600 mx-auto w-4/5 flex flex-wrap justify-center">
          {products &&
            products.map((product) => (
              <Product product={product} key={product.id} />
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default Home;
