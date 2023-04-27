import FlexBetween from "@/components/FlexBetween";
import {
  Avatar,
  Box,
  CardMedia,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import {
  useAddFriendMutation,
  useLikeDislikePostMutation,
  useVerifyTokenQuery,
} from "@/api";
import { useSelector } from "react-redux";
import { StateInterface, UserInterface } from "@/state/types";
import Comments from "./Comments";
import { Link } from "react-router-dom";

type Props = {};

const Feed = (props: Props) => {
  const { post } = props;
  const token = useSelector<StateInterface>(
    (state) => state.persistedReducer.token
  ) as string;
  const imageSize = "50px";
  const theme = useTheme();
  const [like] = useLikeDislikePostMutation();
  const [addFriend] = useAddFriendMutation();
  const { data } = useVerifyTokenQuery({
    skip: !token,
    queryKey: ["verifyToken", token],
    // set force to true to force a fresh query fetch
    force: true,
  });
  const isUserOwnPost = token && post.userId === data?.user._id;
  const isAlreadyFriend = token && data?.user.friends.includes(post.userId);

  const handleLike = async () => {
    await like(post._id);
  };

  const handleAddFriend = async () => {
    await addFriend(`${data?.user._id}/${post.userId}`);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.alt,
        padding: "1rem 6%",
        borderRadius: "0.7rem",
      }}
    >
      <FlexBetween>
        <Box display={"flex"} gap={"0.7rem"}>
          <Avatar
            src={`${import.meta.env.VITE_BASE_URL}/assets/${
              post.userPicturePath
            }`}
            sx={{ height: imageSize, width: imageSize }}
          />
          <Box>
            <Link
              to={`/profile/${post.userId}`}
              style={{
                fontWeight: 500,
                textDecoration: "none",
                color: theme.palette.primary.dark,
                fontSize: "1.4rem",
              }}
            >
              {post.firstName} {post.lastName}
            </Link>
            <Typography
              fontWeight={500}
              color={theme.palette.neutral.medium}
              variant="h6"
            >
              {post.location}
            </Typography>
          </Box>
        </Box>
        {!isUserOwnPost && !isAlreadyFriend && (
          <IconButton onClick={handleAddFriend}>
            <PersonAddIcon />
          </IconButton>
        )}
      </FlexBetween>
      <Box sx={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
        <Typography sx={{ p: "1rem" }}>{post.description}</Typography>
      </Box>
      {post.picturePath.length > 0 && (
        <CardMedia
          component="img"
          src={`${import.meta.env.VITE_BASE_URL}/assets/${post.picturePath}`}
          sx={{ borderRadius: "1rem" }}
        />
      )}
      <FlexBetween my={"1rem"}>
        <Box display={"flex"} gap={"1.5rem"}>
          <Box display={"flex"} alignItems={"center"}>
            <IconButton onClick={handleLike}>
              <FavoriteBorderOutlinedIcon
                sx={{
                  fontSize: "24px",
                  color:
                    data?.user._id in post.likes
                      ? theme.palette.primary.main
                      : "",
                }}
              />
            </IconButton>
            <Typography variant="h6">
              {Object.keys(post.likes).length}
            </Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <IconButton>
              <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: "24px" }} />
            </IconButton>
            <Typography variant="h6">{post.comments.length}</Typography>
          </Box>
        </Box>
        <IconButton>
          <ShareOutlinedIcon />
        </IconButton>
      </FlexBetween>
      <Divider />
      <Comments comments={post.comments} />
    </Box>
  );
};

export default Feed;