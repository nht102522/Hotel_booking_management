import { useRef, useEffect } from "react";

function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef(null);
  useEffect(
    function () {
      function handleClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing);
      return function () {
        document.removeEventListener("click", handleClick, listenCapturing);
      };
    },
    [handler, listenCapturing],
  );
  return ref;
}

export default useOutsideClick;
