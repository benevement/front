export const useOnGlobalEvent = (type, callback, options) => {
    const listener = React.useRef(null);
    const previousProps = React.useRef({ type, options });
  

    React.useEffect(() => {
      const { type: previousType, options: previousOptions } = previousProps; 
      if (listener.current) {
        window.removeEventListener(
          previousType,
          listener.current,
          previousOptions
        );
      }
      listener.current = window.addEventListener(type, callback, options);
      previousProps.current = { type, options };
      return () => {
        window.removeEventListener(type, listener.current, options);
      };
    }, [callback, type, options]);
  };
  

  const App2 = () => {
    useOnGlobalEvent('mousemove', e => {
      console.log(`(${e.x}, ${e.y})`);
    });
  
    return <p>Move your mouse around</p>;
  };
  
  /*
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App2 />
  );
  */
  export default App2;