import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import axios from 'axios';

const API = '/api/pokedex';
const fetcher = async (query) => {
  try {
    const response = await axios.get(query);

    return response.data;
  } catch (error) {
    console.error(`Error fetching pokedex: ${error.message}`);
    return 'Error';
  }
};

export default function Home() {
  const { data, error } = useSWR(API, fetcher);

  if (error) return <div>failed to load</div>;

  if (!data) return <div>loading...</div>;

  return (
    <div>
      {JSON.stringify(data)}
      {data.pokemonList.results.map((pokemon) => (
        <div>
          <img src={pokemon.sprite} alt={pokemon.name} />
          <div>{pokemon.name.toUpperCase()}</div>
          <a className="" href={pokemon.url} target="_blank" rel="noreferrer">
            View more
          </a>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container">
      <Head>
        <title>Pokenext</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main />

      <footer />

      <style jsx>
        {`
          // .container {
          //   min-height: 100vh;
          //   padding: 0 0.5rem;
          //   display: flex;
          //   flex-direction: column;
          //   justify-content: center;
          //   align-items: center;
          // }

          // @media (max-width: 600px) {
          //   .grid {
          //     width: 100%;
          //     flex-direction: column;
          //   }
          // }
        `}
      </style>

      <style jsx global>
        {`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}
      </style>
    </div>
  );
}
