// import {useRef, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa';

// const Header = () => {
//   const [isSticky, setIsSticky] = useState("false")
//   const ref = useRef();
//   useEffect(()=>{
//     const cachedRef = ref.current,
//           observer = new IntersectionObserver(
//             ([e]) => setIsSticky(e.intersectionRatio < 1),
//             {
//               threshold: [1],
//               // rootMargin: '-1px 0px 0px 0px',  // alternativly, use this and set `top:0` in the CSS
//             }
//           )

//     observer.observe(cachedRef)

//     // unmount
//     return function(){
//       observer.unobserve(cachedRef)
//     }
//   }, [])

//   return (

//       <header ref={ref} className={(isSticky ? " isSticky bg-red-500 font-bold text-3a575d font-bold text-xl px-1 w-full h-12" : "bg-red-500 font-bold text-3a575d font-bold text-xl px-1 w-full h-12")}>
//       <div className=" mx-auto flex items-center justify-between px-4 bg-red-500">
//         <Link to="/">
//           {/* Add your company logo here */}
//           <img src="/logo.png" alt="Company Logo" className="h-8" />
//         </Link>
// <nav className="flex items-center gap-3">
//   <Link to="/link1" className="nav-links">New Arrivals</Link>
//   <Link to="/link2" className="nav-links">Home</Link>
//   <Link to="/link3" className="nav-links">Men</Link>
//   <Link to="/link4" className="nav-links">Women</Link>
//   <Link to="/link5" className="nav-links">Kids</Link>
//   <Link to="/link6" className="nav-links">Footwear</Link>
//   <Link to="/link1" className="nav-links">Sale</Link>
//   <Link to="/link2" className="nav-links">Look Book</Link>
// </nav>
//         <div className="flex items-center">
//           <Link to="/search" className="nav-links">
//             <FaSearch size={18} />
//           </Link>
//           <Link to="/user" className="nav-links">
//             <FaUser size={18} />
//           </Link>
//           <Link to="/wishlist" className="nav-links">
//             <FaHeart size={18} />
//           </Link>
//           <Link to="/checkout" className="nav-links">
//             <FaShoppingCart size={18} />
//           </Link>
//         </div>
//       </div>
//     </header>

//   );
// };

import { useRef, useState, useEffect } from 'react';

function Header({ children, sticky = false, className, ...rest }) {
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef();

  // mount
  useEffect(() => {
    const cachedRef = ref.current,
      observer = new IntersectionObserver(
        ([e]) => setIsSticky(e.intersectionRatio < 1),
        {
          threshold: [1],
          // rootMargin: '-1px 0px 0px 0px',  // alternativly, use this and set `top:0` in the CSS
        }
      );

    observer.observe(cachedRef);

    // unmount
    return function () {
      observer.unobserve(cachedRef);
    };
  }, []);

  return (
    <header
      ref={ref}
      className={
        'bg-white font-bold text-3a575d font-bold text-xl px-[1.5%] pb-1 pt-1 w-full' +
        (isSticky ? ' isSticky' : '')
      }
    >
      <div className=" mx-auto flex items-center justify-between px-4 h-12 ">
        <Link to="/">
          {/* Add your company logo here */}
          <img
            src="https://cdn.shopify.com/s/files/1/2219/4051/files/web-logo_1_340ee096-60ef-4574-a134-200819e3977d.png?v=1671171265"
            alt="Company Logo"
            className="w-[125px] h-auto"
          />
        </Link>
        <nav className="flex items-center gap-12">
          <Link to="/link1" className="nav-links">
            New Arrivals
          </Link>
          <Link to="/link2" className="nav-links">
            Home
          </Link>
          <Link to="/link3" className="nav-links">
            Men
          </Link>
          <Link to="/link4" className="nav-links">
            Women
          </Link>
          <Link to="/link5" className="nav-links">
            Kids
          </Link>
          <Link to="/link6" className="nav-links">
            Footwear
          </Link>
          <Link to="/link1" className="nav-links">
            Sale
          </Link>
          <Link to="/link2" className="nav-links">
            Look Book
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/search" className="nav-links">
            <FaSearch size={20} />
          </Link>
          <Link to="/user" className="nav-links">
            <FaUser size={20} />
          </Link>
          <Link to="/wishlist" className="nav-links">
            <FaHeart size={20} />
          </Link>
          <Link to="/checkout" className="nav-links">
            <FaShoppingCart size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
