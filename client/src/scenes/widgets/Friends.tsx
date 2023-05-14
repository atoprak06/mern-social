import { Box, Typography, useTheme } from "@mui/material";
import Friend from "./Friend";
import { useGetUserFriendsQuery } from "@/api";
import Loading from "@/components/Loading";
import NewBadge from "./NewBadge";

type Props = {
  userId?: string;
  isOwner: boolean;
};

const Friends = (props: Props) => {
  const { userId, isOwner } = props;
  const { data, isLoading, isError } = useGetUserFriendsQuery(userId || "");
  const theme = useTheme();

  if (isLoading) return <Loading />;
  if (isError) {
    return (
      <Typography variant="h5">Error while fetching user friends..</Typography>
    );
  }

  const allFriends = data?.map((friend) =>
    isOwner ? (
      <NewBadge key={friend._id} userId={friend._id}>
        <Friend friend={friend} userId={userId || ""} isOwner={isOwner} />
      </NewBadge>
    ) : (
      <Friend
        key={friend._id}
        friend={friend}
        userId={userId || ""}
        isOwner={isOwner}
      />
    )
  );

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.alt,
        display: "flex",
        flexDirection: "column",
        p: "1rem 6%",
        borderRadius: "0.7rem",
        gap: "1rem",
        maxHeight: "50vh",
        overflowY: "auto",
      }}
    >
      <Typography variant="h3" fontWeight={700}>
        {data?.length} Friends
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
