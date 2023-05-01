import { useGetFeedsQuery } from "@/api";
import { Box, Typography } from "@mui/material";
import Feed from "./Feed";
import Loading from "@/components/Loading";
import { useEffect, useRef, useState } from "react";
import { GetPostInterface } from "@/api/types";

type Props = {
  userId?: string;
};

const Feeds = (props: Props) => {
  const { userId } = props;
  const [page, setPage] = useState<number>(1);
  const limit = 12;
  const [posts, setPosts] = useState<Array<GetPostInterface>>([]);
  const { data, isLoading, isError, isFetching } = useGetFeedsQuery({
    userId: userId || "",
    page,
    limit,
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.posts) {
      setPosts((prev) => {
        const updatedPosts = data.posts.map((post) => {
          const index = prev.findIndex((p) => p._id === post._id);
          if (index !== -1 && prev[index].updatedAt === post.updatedAt) {
            return prev[index];
          }
          return post;
        });
        return [
          ...prev.filter((p) => !data.posts.some((post) => post._id === p._id)),
          ...updatedPosts,
        ];
      });
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !isFetching &&
        data?.totalPosts &&
        posts.length < data?.totalPosts
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    const loadMoreNode = loadMoreRef.current;

    if (loadMoreNode) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreNode) {
        observer.unobserve(loadMoreNode);
      }
    };
  }, [isFetching, posts.length, data?.totalPosts]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Typography>Error fetching feeds.</Typography>;
  }

  const feeds = posts.map((post) => {
    return <Feed key={post._id} post={post} />;
  });

  return (
    <Box display={"flex"} gap={"1rem"} flexDirection={"column"}>
      {feeds}
      <Box ref={loadMoreRef}>{isFetching ? <Loading /> : ""}</Box>
    </Box>
  );
};

export default Feeds;
