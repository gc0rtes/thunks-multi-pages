import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//to Link component PostsFeed to PostPage
import { Link } from "react-router-dom";

//Momento to show date friendly
import moment from "moment";

//Fetch the data, ACTION send to the reduce switch and update ReduxState
import { fetchPosts } from "../store/feed/actions";

//SELECT the data from the Reduxstate
import { getPosts, getLoading } from "../store/feed/selectors";

//Get some style!
import "./PostsFeed.css";

export default function PostsFeed() {
  const dispatch = useDispatch();

  //SELECT the data from the Reduxstate and store in a variable
  const posts = useSelector(getPosts);
  const loadingStatus = useSelector(getLoading);

  //we still call the data fetching inside useEffect
  useEffect(() => {
    //I'm telling do it the first time! Not everytime I go to this page!
    if (!posts.length) {
      dispatch(fetchPosts()); //call/dispatch the ACTION from posts store to fetch data
    }
  }, []);

  return (
    <div className="PostsFeed">
      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid black", margin: 10 }}>
          <h3>
            {/* Make the titles links to user navigate to PostPage */}
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </h3>
          <h4>{post.content}</h4>
          <p className="meta">
            {moment(post.createdAt).format("DD-MM-YYYY")} &bull;{" "}
            {/* {post.post_likes.length} likes &bull;{" "} */}
            <span className="tags">
              {post.tags.map((tag) => {
                return (
                  <span key={tag.id}>
                    <span className="Tag">{tag.tag}</span>{" "}
                  </span>
                );
              })}
            </span>
          </p>
          <h4>Id: {post.id}</h4>
        </div>
      ))}
      <p>
        {/* 
        loadingSatus: is true? data not fetched yet. Show "Loading..."
        loadingSatus: is false? data fetched! Show "data"
        
        */}
        {loadingStatus ? (
          <em>"Loading..."</em>
        ) : (
          <button onClick={() => dispatch(fetchPosts())}>Load More</button> //ficar atento ao parenteses fetchPosts()
        )}
      </p>
    </div>
  );
}
