import { useGetUserQuery, useVerifyTokenQuery } from "@/api";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import Profile from "../widgets/Profile";
import Friends from "../widgets/Friends";
import Feeds from "../widgets/Feeds";
import WhatsOnYourMind from "../widgets/WhatsOnYourMind";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { StateInterface } from "@/api/types";
import Loading from "@/components/Loading";

const ProfilePageGridBigScreen = `
"a a b b b "
`;

const ProfilePage = () => {
  const { userId } = useParams();
  const { data: User, isLoading, isError } = useGetUserQuery(userId);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isOwner, setIsOwner] = useState(false);
  const token = useSelector<StateInterface>(
    (state) => state.persistedReducer.token
  ) as string;
  const [newPostAdded, setNewPostAdded] = useState(false);
  const { data: VerifyToken } = useVerifyTokenQuery({
    skip: !token,
  });

  useEffect(() => {
    return () => {
      setIsOwner(false);
      setNewPostAdded(false);
    };
  }, []);

  useEffect(() => {
    if (token) {
      const bool = VerifyToken?.user._id === User?._id;
      setIsOwner(bool);
    } else setIsOwner(false);
  }, [token, User, VerifyToken]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Typography variant="h1">
        {" "}
        Error while fetching profile page user data..
      </Typography>
    );
  }

  return (
    <Box
      sx={
        !isSmallScreen
          ? {
              display: "grid",
              gridTemplateAreas: ProfilePageGridBigScreen,
              gridTemplateRows: "repeat(1,minmax(40px,1fr))",
              gridTemplateColumns: "repeat(5,minmax(40px,1fr))",
              p: "1rem 10%",
            }
          : { display: "flex", flexDirection: "column" }
      }
    >
      <Box
        sx={{
          gridArea: "a",
          p: "1rem 6%",
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
        }}
      >
        <Profile user={User} isOwner={isOwner} />
        <Friends userId={User._id} isOwner={isOwner} />
      </Box>
      <Box
        sx={{
          gridArea: "b",
          p: "1rem 6%",
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
        }}
      >
        {isOwner && (
          <WhatsOnYourMind user={User} setNewPostAdded={setNewPostAdded} />
        )}
        <Feeds userId={User._id} newPostAdded={newPostAdded} />
      </Box>
    </Box>
  );
};

export default ProfilePage;
