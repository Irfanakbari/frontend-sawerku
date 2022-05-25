import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { Router } from 'next/router';
import { SpinnerDotted } from 'spinners-react';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
    {
      loading ? <div className="flex h-screen">
      <div className="m-auto">
        <SpinnerDotted />
        <h4>Loading ...</h4>
      </div>
    </div> : <Component {...pageProps} />
    }
    </>
  )
}

export default MyApp
