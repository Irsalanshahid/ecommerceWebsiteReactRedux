import {Fragment, React} from 'react';
import MyCarousel from './Carousel';

const HomePage = () => {
  return (
    <Fragment>
      <img src="/web-banner.webp" className="w-full mt-3"/>
    <div className="grid grid-cols-1 gap-x-0 gap-y-4 md:grid-cols-2 md:gap-x-8 md:gap-y-8 rem-row-gap-1-5 mt-20 p-4">
      <div className="col-span-1"><img src="/HomePage_Men.webp"/></div>
      <div className="col-span-1"><img src="/HomePage_Women.webp"/></div>
      <div className="col-span-1"><img src="/HomePage_Kids.webp"/></div>
      <div className="col-span-1"><img src="/HomePage_FootWear.webp"/></div>
    </div>
    <MyCarousel/>
    </Fragment>
  );
}



export default HomePage;
