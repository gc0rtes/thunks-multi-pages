//Why not as bellow? When I try to use this to render on my PostPage react throw an error: Cannot read property 'title' of null
// export const getPost = (reduxState) => reduxState.postPage.post;

// export const getComments = (reduxState) => reduxState.postPage.comments;

//using the reader solution
//If loading is true means we didn't fetch data yet, so keep all null
//If loading is false, means we already run the "postPage/postFullyFetched" action and we have the data, so we can render it on PostPage.js!!
export function selectPostAndComments(reduxState) {
  return reduxState.postPage.loading
    ? null
    : {
        post: reduxState.postPage.post,
        comments: reduxState.postPage.comments,
      };
}
