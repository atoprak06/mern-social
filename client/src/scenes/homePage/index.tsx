import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Profile from "../widgets/Profile";
import { useVerifyTokenQuery } from "@/api";
import WhatsOnYourMind from "../widgets/WhatsOnYourMind";
import Feeds from "../widgets/Feeds";
import { useSelector } from "react-redux";
import { StateInterface } from "@/api/types";
import Advertisement from "../widgets/Advertisement";
import Friends from "../widgets/Friends";
import Loading from "@/components/Loading";
import { useState } from "react";

const HomePageGridBigScreen = `
"a a b b b c c"
`;

const HomePage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const token = useSelector<StateInterface>(
    (state) => state.persistedReducer.token
  ) as string;
  const [newPostAdded, setNewPostAdded] = useState(false);
  const { data, isLoading, isError } = useVerifyTokenQuery({
    skip: !token,
    queryKey: ["verifyToken", token],
    // set force to true to force a fresh query fetch
    force: true,
  });

  if (isLoading) return <Loading />;
  if (isError)
    return <Typography variant="h1">Error when fetching user data</Typography>;

  return (
    <>
      <Box
        sx={
          !isSmallScreen
            ? {
                display: "grid",
                gridTemplateAreas: HomePageGridBigScreen,
                gridTemplateRows: "repeat(1,minmax(40px,1fr))",
                gridTemplateColumns: "repeat(7,minmax(40px,1fr))",
              }
            : { display: "flex", flexDirection: "column" }
        }
        height={"100%"}
        p={"1rem 6%"}
        gap={"2rem"}
      >
        <Box gridArea={"a"}>
          <Profile user={data && data?.user} isOwner={true} />
        </Box>

        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"1rem"}
          gridArea={"b"}
        >
          <WhatsOnYourMind
            setNewPostAdded={setNewPostAdded}
            user={data?.user}
          />
          <Feeds newPostAdded={newPostAdded} />
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"1rem"}
          gridArea={"c"}
        >
          <Advertisement />
          <Friends userId={data?.user._id} isOwner={true} />
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
