import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/posts/selectors";

export default function PostsFeed() {
  const dispatch = useDispatch();

  const posts = useSelector(getPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://codaisseur-coders-network.herokuapp.com/posts`
        );

        // So we gonna put this on the Redux to store the busines logic
        //  STEPS
        //  And we want to store in Redux not in the component:
        //  1. Make a reducer slice for it
        //  2. Make an action to send to the store

        //**make an action

        const allPosts = response.data.rows;

        const action = { type: "STORE_POSTS", payload: allPosts }; //we have to put this on the action file to reuse

        dispatch(action);

        //  3. Make a case to go with this action
        //We created a reducer on our store posts : all

        //  4. Selector to get the data back in the component
        //now I need to get this data from the state!
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid black", margin: 10 }}>
          <h3>{post.title}</h3>
          <h4>{post.content}</h4>
        </div>
      ))}
    </div>
  );
}
