import { StateInterface } from "@/api/types";
import { Badge } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
type Props = {
  userId?: string;
  children: React.ReactNode;
};

const NewBadge = (props: Props) => {
  const { children, userId } = props;
  const activeUsers = useSelector<StateInterface>(
    (state) => state.socketReducer.activeUsers
  ) as Array<string>;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return () => {
      setIsActive(false);
    };
  }, []);

  useEffect(() => {
    if (userId) {
      if (activeUsers.includes(userId)) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  }, [activeUsers, userId]);

  return (
    <Badge
      overlap="rectangular"
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      variant="dot"
      color={isActive ? "success" : "error"}
      sx={{ zIndex: 1 }}
    >
      {children}
    </Badge>
  );
};

export default NewBadge;
