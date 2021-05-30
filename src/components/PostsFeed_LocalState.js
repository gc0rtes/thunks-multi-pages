import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import "./PostsFeed.css";

const API_URL = `https://codaisseur-coders-network.herokuapp.com`;

export default function PostsFeedLocal() {
  const [data, setData] = useState({
    loading: true, // true or false what changes?
    posts: [],
  });

  //make a function to limit the results shown and set the offset
  async function fetchNext5Posts() {
    //we don't want keep it on state anymore
    setData({ ...data, loading: true });

    /** STEPS
     * And we want to store in Redux not in the component:
     * 1. Make a reducer slice for it
     * 2. Make an action to send to the store
     * 3. Make a case to go with this action
     * 4. Selector to get the data back in the component
     */

    const res = await axios.get(
      `${API_URL}/posts?offset=${data.posts.length}&limit=5`
    );
    console.log("what is response?", res);

    const morePosts = res.data.rows; //path to posts

    setData({
      loading: false,
      posts: [...data.posts, ...morePosts],
    });
  }

  //using the function to fetchData
  useEffect(() => {
    fetchNext5Posts();
  }, []);

  return (
    <div className="PostsFeed">
      <h2>Recent posts</h2>
      {data.posts.map((post) => {
        return (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p className="meta">
              {moment(post.createdAt).format("DD-MM-YYYY")} &bull;{" "}
              {/* {post.post_likes.length} likes &bull;{" "} */}
              <span className="tags">
                {post.tags.map((tag) => {
                  return (
                    <React.Fragment key={tag.id}>
                      <span className="Tag">{tag.tag}</span>{" "}
                    </React.Fragment>
                  );
                })}
              </span>
            </p>
          </div>
        );
      })}
      <p>
        {data.loading ? (
          <em>Loading...</em>
        ) : (
          <button onClick={fetchNext5Posts}>Load more</button>
        )}
      </p>
    </div>
  );
}
