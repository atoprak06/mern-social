import { useGetFeedsQuery } from "@/api";
import { Box, Typography } from "@mui/material";
import Feed from "./Feed";
import Loading from "@/components/Loading";

type Props = {
  userId?: string;
};

const Feeds = (props: Props) => {
  const { userId } = props;
  const { data, isLoading, isError } = useGetFeedsQuery(userId || "");

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Typography>Error fetching feeds.</Typography>;
  }

  const feeds = data?.map((post) => {
    return <Feed key={post._id} post={post} />;
  });

  return (
    <Box display={"flex"} gap={"1rem"} flexDirection={"column"}>
      {feeds}
    </Box>
  );
};

export default Feeds;
