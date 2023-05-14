import { Avatar } from "@mui/material";
import React, { ForwardedRef, forwardRef } from "react";

type Props = {
  forwardedRef: ForwardedRef<HTMLDivElement>;
};

const AvatarWithRef = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { forwardedRef, ...rest } = props;

  return <Avatar {...rest} ref={ref} />;
});

export default AvatarWithRef;
