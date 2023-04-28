import FlexBetween from "@/components/FlexBetween";
import { Box, CardMedia, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {};

const Advertisement = (props: Props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.alt,
        p: "1rem 6%",
        borderRadius: "0.7rem",
      }}
    >
      <FlexBetween>
        <Typography
          variant="h5"
          fontWeight={500}
          color={theme.palette.neutral.dark}
        >
          Sponsored
        </Typography>
        <Typography
          variant="h6"
          fontWeight={500}
          color={theme.palette.neutral.medium}
        >
          Create Ad
        </Typography>
      </FlexBetween>
      <CardMedia
        component={"img"}
        src="/assets/react.svg"
        sx={{ borderRadius: "1rem", padding: "2rem" }}
      />
      <FlexBetween>
        <Typography
          variant="h6"
          fontWeight={500}
          color={theme.palette.neutral.dark}
        >
          React
        </Typography>
        <Link
          to={"https://react.dev/"}
          color={theme.palette.neutral.medium}
          target="_blank"
          style={{
            textDecoration: "none",
            color: theme.palette.primary.dark,
          }}
        >
          React Dev
        </Link>
      </FlexBetween>
      <Typography
        marginTop={"1rem"}
        variant="h6"
        color={theme.palette.neutral.medium}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
        laudantium repellat sit ex pariatur nemo error illo voluptates dicta
        fugiat animi quasi qui, ducimus a, quia, consequuntur reprehenderit ab
        dolores.
      </Typography>
    </Box>
  );
};

export default Advertisement;
