import type { NextPage } from "next";
import dynamic from "next/dynamic";

const App = dynamic(() => import("../App"), {
  ssr: false,
});

const Home: NextPage = () => {
  return <App />;
};

export default Home;
