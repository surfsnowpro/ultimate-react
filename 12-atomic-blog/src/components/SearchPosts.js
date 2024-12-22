import {PostContext} from "../App";
import {useContext} from "react";

export function SearchPosts() {
  const context = useContext(PostContext);
  const {searchQuery, setSearchQuery} = context;

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}