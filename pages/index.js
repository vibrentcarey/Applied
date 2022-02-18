import Head from 'next/head'
import Image from 'next/image'
import Hero from '../components/Hero'
import { getSession } from "next-auth/client";
import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function Home({ session }) {
  const router = useRouter()
  useEffect(() => {
    if (session) {
    } else {
      router.replace("/auth");
    }
  }, [session]);
  return (

    <main>
      <Hero />
    </main>
  )
}


export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}