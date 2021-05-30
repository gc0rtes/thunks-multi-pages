//To trigger our fetch function
import { useEffect } from "react";

//to dispatch and select our actions
import { useDispatch, useSelector } from "react-redux";

//To access route parameters from dynamic routes
import { useParams } from "react-router-dom";

//use its ReactMarkdown component to format the contents beautifully
//The post's contents are written in Markdown
import ReactMarkdown from "react-markdown";

//import my fetch thunk function ACTION
import { fetchPost } from "../store/postPage/actions";

//SELECT the data from the Reduxstate
import { selectPostAndComments } from "../store/postPage/selectors";

//Momento to show date friendly
import moment from "moment";

export default function PostPage() {
  const dispatch = useDispatch();

  //get post id from broswer bar. Obs: route "/post/:id"
  const { id } = useParams();

  //SELECT the data from the Reduxstate and store in a variable
  const postAndComments = useSelector(selectPostAndComments);
  console.log("what is postAndComments", postAndComments);

  //send id to an ACTION
  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1>Post Page Here!</h1>
      <p>Your id parameter is {id}</p>
      <div>
        {/* Aqui estou fazendo a verificacao em cima do DATA. Se for falso ainda nao carregou a data, se verdadeiro ja carregou */}
        {!postAndComments ? (
          <em>"Loading..."</em>
        ) : (
          <>
            <h1>{postAndComments.post.title}</h1>
            {/* render the date the post was written on, the name of the developer
            who wrote the post, and the tags assigned to the post. */}
            <p className="meta">
              By <strong>{postAndComments.post.developer.name}</strong> &bull;{" "}
              {moment(postAndComments.post.createdAt).format("DD-MM-YYYY")}{" "}
              &bull;{" "}
              <span className="tags">
                {postAndComments.post.tags.map((tag) => {
                  return (
                    <span key={tag.id} className="Tag">
                      {tag.tag}
                    </span>
                  );
                })}
              </span>
            </p>
            <ReactMarkdown children={postAndComments.post.content} />
            <h2>Comments</h2>
            <div>
              {postAndComments.comments.rows.map((comment) => (
                <div key={comment.id}>
                  <p>{comment.text}</p>
                  <p className="meta">
                    By <strong>{comment.developer.name}</strong> &bull;{" "}
                    {moment(comment.createdAt).format("DD-MM-YYYY")}{" "}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
