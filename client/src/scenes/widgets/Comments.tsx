import { useGetPostCommentsQuery } from "@/api";
import Loading from "@/components/Loading";
import Comment from "./Comment";
import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CommentInterface } from "@/api/types";
type Props = {
  postId: string;
  userId?: string;
  newCommentAdded: boolean;
};

const Comments = (props: Props) => {
  const { postId, userId, newCommentAdded } = props;
  const [page, setPage] = useState<number>(1);
  const limit = 7;
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [commentsState, setCommentsState] = useState<Array<CommentInterface>>(
    []
  );
  const { data, isLoading, isFetching } = useGetPostCommentsQuery({
    postId,
    page: newCommentAdded ? 1 : page,
    limit,
  });

  useEffect(() => {
    return () => {
      setPage(1);
      setCommentsState([]);
    };
  }, []);

  useEffect(() => {
    if (data?.comments.comments) {
      setCommentsState((prev) => {
        const updatedComments = data?.comments.comments.map((comment) => {
          const index = prev.findIndex((c) => c._id === comment._id);
          if (index !== -1 && prev[index].updatedAt === comment.updatedAt) {
            return prev[index];
          }
          return comment;
        });
        return [
          ...prev.filter(
            (c) =>
              !data.comments.comments.some((comment) => comment._id === c._id)
          ),
          ...updatedComments,
        ].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !isFetching &&
        data?.totalComments &&
        commentsState.length < data?.totalComments &&
        !newCommentAdded
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    const loadMoreNode = loadMoreRef.current;
    if (loadMoreNode) {
      observer.observe(loadMoreNode);
    }
    return () => {
      if (loadMoreNode) {
        observer.unobserve(loadMoreNode);
      }
    };
  }, [data?.totalComments, isFetching, commentsState.length, newCommentAdded]);

  if (isLoading) return <Loading />;

  const comments = commentsState.map((comment) => {
    return <Comment key={comment._id} userId={userId} comment={comment} />;
  });

  return (
    <Box
      my={"1rem"}
      pr={"1rem"}
      display={"flex"}
      flexDirection={"column"}
      gap={"0.5rem"}
      sx={{
        overflowY: "auto",
      }}
      maxHeight={"30vh"}
    >
      {comments && comments.length > 0 ? (
        <>
          {comments} <Box ref={loadMoreRef}></Box>
        </>
      ) : (
        <Typography>No comments yet..</Typography>
      )}
      <Divider />
    </Box>
  );
};

export default Comments;
