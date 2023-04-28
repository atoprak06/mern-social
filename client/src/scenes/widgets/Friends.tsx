import { Box, Typography, useTheme } from "@mui/material";
import Friend from "./Friend";
import { useGetUserFriendsQuery } from "@/api";

type Props = {
  userId?: string;
  isOwner: boolean;
};

const Friends = (props: Props) => {
  const { userId, isOwner } = props;
  const { data, isLoading, isError } = useGetUserFriendsQuery(userId || "");
  const theme = useTheme();

  if (isLoading) return <Typography variant="h5">Friends Loading..</Typography>;
  if (isError)
    return (
      <Typography variant="h5">Error while fetching user friends..</Typography>
    );
  const allFriends = data?.map((friend) => (
    <Friend
      key={friend._id}
      friend={friend}
      userId={userId || ""}
      isOwner={isOwner}
    />
  ));
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.alt,
        display: "flex",
        flexDirection: "column",
        p: "1rem 6%",
        borderRadius: "0.7rem",
        gap: "1rem",
      }}
    >
      <Typography variant="h3" fontWeight={700}>
        Friends
      </Typography>
      {allFriends && allFriends.length > 0 ? (
        allFriends
      ) : (
        <Typography variant="h6">No friends yet..</Typography>
      )}
    </Box>
  );
};

export default Friends;
