import FlexBetween from "@/components/FlexBetween";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { StateInterface, UserInterface } from "@/api/types";
import { useGetChatQuery } from "@/api";
import Loading from "@/components/Loading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import getTimeDiff from "@/utils/getTimeDiff";
import { useEffect } from "react";

type Props = {
  setShowNewMessage(arg: boolean): void;
  user?: UserInterface;
  setSelectedChat(arg: string): void;
  selectedChat: string;
};

const Messages = (props: Props) => {
  const { setShowNewMessage, user, setSelectedChat, selectedChat } = props;

  const navigate = useNavigate();
  const token = useSelector<StateInterface>(
    (state) => state.persistedReducer.token
  ) as string;
  const { data, isLoading, refetch } = useGetChatQuery({
    skip: !token,
    force: true,
    queryKey: ["chat", token],
  });
  const theme = useTheme();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loading />;

  const chats = data?.map((chat) => {
    const participantsLength = chat.participants.length;
    return (
      <Box
        onClick={() => setSelectedChat(chat._id)}
        key={`chat+${chat._id}`}
        sx={{
          "&:hover": { backgroundColor: theme.palette.primary.light },
          backgroundColor:
            selectedChat === chat._id ? theme.palette.primary.light : "",
          cursor: "pointer",
        }}
      >
        <Box
          display={"flex"}
          gap={"0.5rem"}
          alignItems={"center"}
          sx={{
            padding: "1rem",
            borderRadius: "0.5rem",
          }}
        >
          <Box display="flex" alignItems={"center"}>
            {user?._id === chat.createdBy._id ? (
              chat.participants.slice(0, 3).map((participant, index) => {
                return (
                  <Avatar
                    key={`${participant._id}+msgAvatar`}
                    src={
                      participant.picturePath.length > 0
                        ? `${import.meta.env.VITE_BASE_URL}/assets/${
                            participant.picturePath
                          }`
                        : "/assets/react.svg"
                    }
                    sx={{
                      zIndex: 2 - index,
                      marginRight:
                        participantsLength > 1 && index === 0
                          ? "-24px"
                          : participantsLength >= 3 && index === 1
                          ? "-24px"
                          : "",
                      "&:hover": { cursor: "pointer" },
                    }}
                    alt={`${participant.firstName} ${participant.lastName}`}
                    onClick={() => navigate(`/profile/${participant._id}`)}
                  />
                );
              })
            ) : (
              <Avatar
                src={
                  chat.createdBy.picturePath.length > 0
                    ? `${import.meta.env.VITE_BASE_URL}/assets/${
                        chat.createdBy.picturePath
                      }`
                    : "/assets/react.svg"
                }
                alt={`${chat.createdBy.firstName} ${chat.createdBy.lastName}`}
                onClick={() => navigate(`/profile/${chat.createdBy._id}`)}
              />
            )}
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"0.5rem"}
            sx={{ overflowX: "auto" }}
          >
            {user?._id === chat.createdBy._id ? (
              chat.participants.slice(0, 3).map((participant, index) => {
                return (
                  <Typography
                    key={`${participant._id}+msgFullName`}
                    sx={{
                      whiteSpace: "nowrap",
                      "&:hover": { color: theme.palette.primary.dark },
                    }}
                    fontWeight={700}
                    variant="h6"
                    onClick={() => navigate(`/profile/${participant._id}`)}
                  >
                    {participant.firstName} {participant.lastName}
                    {index < participantsLength - 1
                      ? participantsLength === 2 && index === 0
                        ? " and "
                        : ", "
                      : ""}
                  </Typography>
                );
              })
            ) : (
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  "&:hover": { color: theme.palette.primary.dark },
                }}
                fontWeight={700}
                variant="h6"
                onClick={() => navigate(`/profile/${chat.createdBy._id}`)}
              >
                {`${participantsLength > 1 ? "Group chat by" : ""} ${
                  chat.createdBy.firstName
                } ${chat.createdBy.lastName}`}
              </Typography>
            )}
            {user?._id === chat.createdBy._id && (
              <Typography
                variant="h6"
                sx={{ whiteSpace: "nowrap", fontWeight: 700 }}
              >
                {participantsLength > 3
                  ? `and ${participantsLength - 3} other${
                      participantsLength - 3 > 1 ? "s" : ""
                    }`
                  : ""}
              </Typography>
            )}
          </Box>
        </Box>
        <Typography
          variant="h6"
          sx={{
            textAlign: "end",
            fontSize: "0.7rem",
            fontWeight: 700,
            margin: "8px",
          }}
        >
          Last updated {getTimeDiff(chat.updatedAt)}
        </Typography>
      </Box>
    );
  });

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      sx={{ backgroundColor: theme.palette.background.alt, height: "100%" }}
    >
      <FlexBetween paddingTop={"1rem"} paddingX={"1rem"} borderRadius={"1rem"}>
        <Typography variant="h4" fontWeight={700}>
          {user?.firstName} {user?.lastName}
        </Typography>
        <IconButton onClick={() => setShowNewMessage(true)}>
          <AddCommentIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
      </FlexBetween>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
        padding={"1rem"}
        height={"100%"}
        sx={{ overflowX: "auto" }}
      >
        {chats}
      </Box>
    </Box>
  );
};

export default Messages;
