import Head from "next/head";
import "@/styles/globals.css";
import { SocketProvider } from "@/context/socketContext";

export default function App({ Component, pageProps }) {
  return (
    <SocketProvider>
      {" "}
      {/* Update here */}
      <Head>
        <title>CU-Meet - Video Conferencing Platform</title>
        <meta
          name="description"
          content="CU-Meet is a WebRTC-based video conferencing platform designed for seamless, real-time video communication."
        />
        <meta
          name="keywords"
          content="CU-Meet, video conferencing, WebRTC, Google Meet alternative"
        />
        <meta name="author" content="Vardaan Bhatia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </SocketProvider>
  );
}
