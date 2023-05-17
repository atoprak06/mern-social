import { useGetSingleChatQuery } from "@/api";
import { MessageInterface, UserInterface } from "@/api/types";
import Loading from "@/components/Loading";
import {
  Avatar,
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "@/socket/socket";
import getTimeDiff from "@/utils/getTimeDiff";
import NewBadge from "./NewBadge";

type Props = {
  user?: UserInterface;
  selectedChat: string;
};

const ChatBox = (props: Props) => {
  const { user, selectedChat } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = useState("");
  const { data, isLoading, isFetching, refetch } =
    useGetSingleChatQuery(selectedChat);
  const [messagesState, setMessagesState] = useState<Array<MessageInterface>>(
    []
  );
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedChat.length > 0) {
      socket.emit("startChat", selectedChat);
      const handleSetMesage = (message: MessageInterface) => {
        setMessagesState((prev) => [...prev, message]);
      };
      socket.on("chat", handleSetMesage);
    }
    return () => {
      socket.off("chat");
      socket.emit("leaveRoom", selectedChat);
    };
  }, [selectedChat]);

  useEffect(() => {
    refetch();
  }, [refetch, selectedChat]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messagesState]);

  useEffect(() => {
    if (!isFetching && data) {
      setMessagesState(data?.messages);
    }
  }, [isFetching, data]);

  useEffect(() => {
    return () => {
      setMessagesState([]);
      setValue("");
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length > 0) {
      socket.emit(
        "chat",
        { chatId: selectedChat, msg: value },
        (newMessage: MessageInterface) => {
          setMessagesState((prev) => [...prev, newMessage]);
        }
      );
      setValue("");
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  if (isLoading) return <Loading />;

  const CreatedBy = () => {
    return (
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={"0.2rem"}
        sx={{
          "&:hover": { color: theme.palette.primary.dark, cursor: "pointer" },
        }}
        onClick={() => navigate(`/profile/${data?.createdBy._id}`)}
      >
        <NewBadge userId={data?.createdBy._id}>
          <Avatar
            src={
              data && data?.createdBy.picturePath.length > 0
                ? `${import.meta.env.VITE_BASE_URL}/assets/${
                    data?.createdBy.picturePath
                  }`
                : "/assets/react.svg"
            }
          />
        </NewBadge>

        <Typography whiteSpace={"nowrap"} fontWeight={700}>
          {data?.createdBy.firstName} {data?.createdBy.lastName}
        </Typography>
      </Box>
    );
  };

  const participants = data?.participants
    .filter((participant) => participant._id !== user?._id)
    .map((participant) => {
      return (
        <Box
          key={`${participant._id}+participant`}
          display={"flex"}
          alignItems={"center"}
          gap={"0.2rem"}
          sx={{
            "&:hover": { color: theme.palette.primary.dark, cursor: "pointer" },
          }}
          onClick={() => navigate(`/profile/${participant._id}`)}
        >
          <NewBadge userId={participant._id}>
            <Avatar
              src={
                participant.picturePath.length > 0
                  ? `${import.meta.env.VITE_BASE_URL}/assets/${
                      participant.picturePath
                    }`
                  : "/assets/react.svg"
              }
            />
          </NewBadge>

          <Typography whiteSpace={"nowrap"} fontWeight={700}>
            {participant.firstName} {participant.lastName}
          </Typography>
        </Box>
      );
    });

  const messages = messagesState?.map((message) => {
    return (
      <Box
        key={message?._id}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent:
            user && message.sender._id === user._id ? "flex-end" : "flex-start",
          gap: "0.3rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Avatar
          src={
            message.sender.picturePath?.length > 0
              ? `${import.meta.env.VITE_BASE_URL}/assets/${
                  message.sender.picturePath
                }`
              : "/assets/react.svg"
          }
          sx={{
            width: "2rem",
            height: "auto",
            "&:hover": { cursor: "pointer" },
          }}
          onClick={() => navigate(`/profile/${message.sender._id}`)}
          alt={message.sender.firstName}
        />

        <Box
          sx={{
            backgroundColor:
              user && message.sender._id === user._id
                ? theme.palette.primary.main
                : theme.palette.neutral.light,
            padding: "0.5rem 1rem",
            maxWidth: "50%",
            width: "fit-content",
            borderRadius: "1rem",
          }}
        >
          {data?.participants.length !== 1 && (
            <>
              <Typography
                variant="h6"
                sx={{ fontSize: "0.8rem", fontWeight: 700 }}
              >
                {message.sender.firstName} {message.sender.lastName}
              </Typography>
              <Divider sx={{ marginBottom: "0.5rem" }} />
            </>
          )}
          <Typography sx={{ wordBreak: "break-word" }}>
            {message?.content}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: "10px",
              color: theme.palette.neutral.mediumMain,
              textAlign: "end",
            }}
          >
            {getTimeDiff(message?.createdAt)}
          </Typography>
        </Box>
      </Box>
    );
  });

  return (
    <>
      <Box
        display={"flex"}
        gap={"0.8rem"}
        padding={"1rem"}
        sx={{ backgroundColor: theme.palette.primary.light, overflowY: "auto" }}
      >
        {user?._id !== data?.createdBy._id && <CreatedBy />}
        {participants}
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.background.alt,

          padding: "1rem",
          borderRadius: "0.7rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflowY: "auto",
        }}
      >
        <Box ref={chatBoxRef} sx={{ overflowY: "auto", height: "60vh" }}>
          {messages}
        </Box>

        <form
          onSubmit={handleSubmit}
          id="form"
          action=""
          style={{ marginTop: "1rem", display: "flex" }}
          autoComplete="false"
        >
          <TextField
            autoComplete="false"
            fullWidth
            onChange={handleValueChange}
            value={value}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    type="submit"
                    sx={{ mr: "auto" }}
                    disabled={value.length > 0 ? false : true}
                  >
                    Send
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Box>
    </>
  );
};

export default ChatBox;
