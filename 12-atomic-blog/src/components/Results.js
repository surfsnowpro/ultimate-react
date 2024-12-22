import {useContext} from "react";
import {PostContext} from "../App";

export function Results() {
  const context = useContext(PostContext);

  return <p>🚀 {context.posts.length} atomic posts found</p>;
}