import { useGetPostCommentsQuery } from "@/api";
import Loading from "@/components/Loading";
import Comment from "./Comment";
import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CommentInterface } from "@/api/types";
type Props = {
  postId: string;
  userId?: string;
};

const Comments = (props: Props) => {
  const { postId, userId } = props;
  const { data, isLoading, isFetching, isError } =
    useGetPostCommentsQuery(postId);
  const [commentsState, setCommentsState] = useState<Array<CommentInterface>>(
    []
  );
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.comments) {
      setCommentsState((prev) => {
        const updatedComments = data?.comments.map((comment) => {
          const index = prev.findIndex((c) => c._id === comment._id);
          if (index !== -1 && prev[index].updatedAt === comment.updatedAt) {
            return prev[index];
          }
          return comment;
        });
        return [
          ...prev.filter(
            (c) => !data.comments.some((comment) => comment._id === c._id)
          ),
          ...updatedComments,
        ];
      });
    }
  }, [data]);

  if (isLoading) return <Loading />;

  const comments = commentsState.map((comment) => {
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
