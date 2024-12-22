import {useEffect, useState} from "react";
import {faker} from "@faker-js/faker";
import {Footer} from "./components/Footer";
import {Archive} from "./components/Archive";
import {Main} from "./components/Main";
import {Header} from "./components/Header";
import {PostProvider} from "./PostContext";

export function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function App() {

  const [isFakeDark, setIsFakeDark] = useState(false);

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    <section>
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>

      <PostProvider>
        <Header/>
        <Main/>
        <Archive/>
        <Footer/>
      </PostProvider>
    </section>
  );
}

export default App;
