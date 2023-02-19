import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Detector</title>
        <meta name="description" content="Make your phone unstoppable" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-4xl">Detector</h1>
      </main>
    </>
  );
}
