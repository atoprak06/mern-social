import FlexBetween from "@/components/FlexBetween";
import { FriendInterface } from "@/api/types";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { useAddFriendMutation } from "@/api";
import { Link } from "react-router-dom";

type Props = {
  friend: FriendInterface;
  userId: string;
  isOwner: boolean;
};

const Friend = (props: Props) => {
  const { friend, userId, isOwner } = props;
  const [addFriend] = useAddFriendMutation();
  const theme = useTheme();
  const handleRemoveFriend = async () => {
    await addFriend(`${userId}/${friend._id}`);
  };
  return (
    <Box>
      <FlexBetween>
        <Box display={"flex"} gap={"12px"}>
          <Avatar
            src={`${import.meta.env.VITE_BASE_URL}/assets/${
              friend.picturePath
            }`}
            sx={{ height: "3rem", width: "3rem" }}
          />
          <Box display={"flex"} flexDirection={"column"} gap={"0.3rem"}>
            <Link
              to={`/profile/${friend._id}`}
              style={{
                fontWeight: 500,
                textDecoration: "none",
                color: theme.palette.primary.dark,
                fontSize: "1rem",
              }}
            >
              {friend.firstName} {friend.lastName}
            </Link>
            <Typography variant="h6" color={theme.palette.neutral.medium}>
              {friend.location}
            </Typography>
          </Box>
        </Box>
        {isOwner && (
          <IconButton onClick={handleRemoveFriend}>
            <PersonRemoveOutlinedIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        )}
      </FlexBetween>
    </Box>
  );
};

export default Friend;
