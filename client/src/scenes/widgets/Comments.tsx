import { useGetPostCommentsQuery } from "@/api";
import Loading from "@/components/Loading";
import Comment from "./Comment";
import { Box, Divider, Typography } from "@mui/material";
type Props = {
  postId: string;
  userId?: string;
};

const Comments = (props: Props) => {
  const { postId, userId } = props;
  const { data, isLoading } = useGetPostCommentsQuery(postId);

  if (isLoading) return <Loading />;

  const comments = data?.comments.map((comment) => {
    return <Comment userId={userId} key={comment._id} comment={comment} />;
  });

  return (
    <Box my={"1rem"} display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
      {comments && comments.length > 0 ? (
        comments
      ) : (
        <Typography>No comments yet..</Typography>
      )}
      <Divider />
    </Box>
  );
};

export default Comments;
