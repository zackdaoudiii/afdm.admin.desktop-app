import * as React from 'react';

import Layout from '../Components/Layout/Layout';
import { useRouter } from 'next/router'
import Router from 'next/router'

export default function Home() {

  const router = useRouter();
console.log(router);
  return (
    <>
        {
          router.pathname == "/" ? Router.push("/login"): "" 
        }
    </>
  )
}
