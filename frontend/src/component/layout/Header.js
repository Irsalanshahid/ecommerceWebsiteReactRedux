// import {useRef, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaRegUser,
  FaRegHeart,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
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

    const hamburgerButton = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlayBlack = document.querySelector('.overlay-black');

    hamburgerButton.addEventListener('click', function () {
      mobileMenu.style.display = 'block';
      overlayBlack.style.display = 'block';

      (function () {
        document.addEventListener('click', function closeMobileMenu(event) {
          if (
            !mobileMenu.contains(event.target) &&
            !hamburgerButton.contains(event.target)
          ) {
            mobileMenu.style.display = 'none';
            overlayBlack.style.display = 'none';
            document.removeEventListener('click', closeMobileMenu);
          }
        });
      })();
    });

    return function () {
      observer.unobserve(cachedRef);
    };
  }, []);

  return (
    <header
      ref={ref}
      className={
        'bg-white font-bold text-3a575d  text-xl px-[1.5%] pb-1 pt-1 w-full ' +
        (isSticky ? ' isSticky' : '')
      }
    >
      <div className="hidden fixed h-full w-full left-0 top-0 bg-[#232323cc] z-[49] overflow-scroll overlay-black"></div>
      <div className=" mx-auto flex items-start justify-between px-4 h-12 ">
        <div className="flex xl:hidden items-center gap-4">
          <div className="hidden fixed h-full w-[337px] left-0 top-0 bg-white z-50 overflow-scroll mobile-menu">
            <Link to="/link2" className="mb-nav-links">
              Home
            </Link>
            <Link to="/link3" className="mb-nav-links">
              Men
            </Link>
            <Link to="/link4" className="mb-nav-links">
              Women
            </Link>
            <Link to="/link5" className="mb-nav-links">
              Kids
            </Link>
            <Link to="/link6" className="mb-nav-links">
              Footwear
            </Link>
            <Link to="/link7" className="mb-nav-links">
              Fragrances
            </Link>
            <Link to="/link8" className="mb-nav-links">
              Sale
            </Link>
            <Link to="/link9" className="mb-nav-links">
              Lookbook
            </Link>
          </div>
          <button className="nav-links hamburger">
            <FaBars size={20} />
          </button>
          <Link to="/search" className="nav-links">
            <FaSearch size={20} />
          </Link>
        </div>
        <Link to="/">
          {/* Add your company logo here */}
          <img
            src="https://cdn.shopify.com/s/files/1/2219/4051/files/web-logo_1_340ee096-60ef-4574-a134-200819e3977d.png?v=1671171265"
            alt="Company Logo"
            className="w-[125px] h-auto min-w-[125px] "
          />
        </Link>
        <div className="flex xl:hidden items-center gap-4">
          <Link to="/user" className="nav-links">
            <FaRegUser size={20} />
          </Link>

          <Link to="/checkout" className="nav-links">
            <FiShoppingCart size={20} />
          </Link>
        </div>

        <nav
          className="hidden xl:flex items-center justify-around mx-1"
          style={{ flexGrow: 1 }}
        >
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
        <div className="hidden xl:flex items-center gap-4">
          <Link to="/search" className="nav-links">
            <FaSearch size={20} />
          </Link>
          <Link to="/user" className="nav-links">
            <FaRegUser size={20} />
          </Link>
          <Link to="/wishlist" className="nav-links">
            <FaRegHeart size={20} />
          </Link>
          <Link to="/checkout" className="nav-links">
            <FiShoppingCart size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
