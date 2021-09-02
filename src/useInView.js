import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

export const useInView = (offset = 0) => {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const currModalRef = modalRef && modalRef.current;
    const elementYPos = () => {
      return (
        ref.getBoundingClientRect().top +
        window.pageYOffset -
        window.innerHeight +
        offset
      );
    };

    if (!ref) {
      return;
    }

    const handleScroll = throttle(() => {
      if (!ref) {
        return;
      }
      if (window.pageYOffset >= elementYPos()) {
        setInView(true);
      } else {
        setInView(false);
      }
    }, 200);

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => {
      if (modalRef && currModalRef) {
        currModalRef.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ref, modalRef, offset]);

  return [setRef, inView];
};
