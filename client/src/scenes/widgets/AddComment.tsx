import { usePostCommentMutation } from "@/api";
import FlexBetween from "@/components/FlexBetween";
import Loading from "@/components/Loading";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

type Props = {
  postId: string;
};

const AddComment = (props: Props) => {
  const { postId } = props;
  const [postComment, { isLoading }] = usePostCommentMutation();
  const [commentValue, setCommentValue] = useState<string>("");
  const handleTextChane = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.currentTarget.value);
  };
  const handlePostComment = async () => {
    const correctForm = new URLSearchParams({
      text: commentValue,
    }).toString();
    await postComment({ postId, correctForm });
    setCommentValue("");
  };
  if (isLoading) return <Loading />;

  return (
    <FlexBetween marginTop={"0.5rem"}>
      <TextField
        placeholder="make a comment.."
        fullWidth
        value={commentValue}
        onChange={handleTextChane}
      />
      <Button
        onClick={handlePostComment}
        disabled={commentValue.length > 0 ? false : true}
      >
        Share
      </Button>
    </FlexBetween>
  );
};

export default AddComment;
