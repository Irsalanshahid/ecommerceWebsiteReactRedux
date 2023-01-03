import React from 'react';
import { useSpring, animated } from 'react-spring';

const LoadingPage = () => {
  const animationProps = useSpring({
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0%)' },
  });

  return (
    <div className="h-screen flex items-center justify-center bg-gray-300">
      <animated.div
        style={animationProps}
        className="text-gray-700 text-5xl font-bold"
      >
        Loading...
      </animated.div>
    </div>
  );
};

export default LoadingPage;
