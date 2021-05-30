import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/posts/actions"; //Fetch the data, ACTION send to the reduce switch and update ReduxState
import { getPosts, getLoading } from "../store/posts/selectors"; //SELECT the data from the Reduxstate

//to use the Link component from
import { Link } from "react-router-dom";

export default function PostsFeed() {
  const dispatch = useDispatch();

  const posts = useSelector(getPosts); //SELECT the data from the Reduxstate and store in a variable

  const loadingStatus = useSelector(getLoading);

  //we still call the data fetching inside useEffect
  useEffect(() => {
    dispatch(fetchPosts()); //call/dispatch the ACTION from posts store to fetch data
  }, []);

  return (
    <div>
      {loadingStatus ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ border: "1px solid black", margin: 10 }}>
            <h3>
              {/* Make the titles links to user navigate to PostPage */}
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h3>
            <h4>{post.content}</h4>
            <h4>Id: {post.id}</h4>
          </div>
        ))
      )}
      {loadingStatus ? (
        "Loading..."
      ) : (
        <button onClick={() => dispatch(fetchPosts())}>Load More</button> //ficar atento ao parenteses fetchPosts()
      )}
    </div>
  );
}
