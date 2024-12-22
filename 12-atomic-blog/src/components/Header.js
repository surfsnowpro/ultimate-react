import {Results} from "./Results";
import {SearchPosts} from "./SearchPosts";
import {useContext} from "react";
import {PostContext} from "../App";

export function Header() {
  const context = useContext(PostContext);
  console.log(context)

  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={context.onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}