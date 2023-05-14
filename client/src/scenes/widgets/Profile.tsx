import FlexBetween from "@/components/FlexBetween";
import { UserInterface } from "@/api/types";
import { Avatar, Box, Divider, Typography, useTheme } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { Link } from "react-router-dom";

type Props = {
  user?: UserInterface;
  isOwner: boolean;
};

const Profile = (props: Props) => {
  const { user, isOwner } = props;
  const theme = useTheme();
  const imageSize = "60px";

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.alt,
        p: "1rem 6%",
        borderRadius: "0.7rem",
      }}
    >
      <FlexBetween>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Avatar
            src={
              user && user?.picturePath.length > 0
                ? `${import.meta.env.VITE_BASE_URL}/assets/${user?.picturePath}`
                : "/assets/react.svg"
            }
            alt={user?.picturePath}
            sx={{ height: imageSize, width: imageSize }}
          />
          <Box>
            <Link
              to={`/profile/${user?._id}`}
              style={{
                fontWeight: 500,
                textDecoration: "none",
                color: theme.palette.primary.dark,
                fontSize: "1.4rem",
              }}
            >
              {user?.firstName} {user?.lastName}
            </Link>
            <Typography variant="h6" color={theme.palette.neutral.main}>
              {user?.friends.length} friends
            </Typography>
          </Box>
        </Box>
        <ManageAccountsIcon sx={{ fontSize: "25px" }} />
      </FlexBetween>
      <Divider sx={{ margin: "1rem 0" }} />
      <Box>
        <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
          <LocationOnOutlinedIcon sx={{ fontSize: "35px" }} />
          <Typography variant="h5" color={theme.palette.neutral.main}>
            {user?.location}
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
          <WorkOutlineOutlinedIcon sx={{ fontSize: "35px" }} />
          <Typography variant="h5" color={theme.palette.neutral.main}>
            {user?.occupation}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ margin: "1rem 0" }} />
      {isOwner && (
        <Box>
          {" "}
          <Box display={"flex"} gap={"1rem"} flexDirection={"column"}>
            <FlexBetween>
              <Typography variant="h6" color={theme.palette.neutral.mediumMain}>
                Who's viewed your profile
              </Typography>
              <Typography
                variant="h5"
                fontWeight={500}
                color={theme.palette.neutral.main}
              >
                {user?.viewedProfile}
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography variant="h6" color={theme.palette.neutral.mediumMain}>
                Impressions of your post
              </Typography>
              <Typography
                variant="h5"
                fontWeight={500}
                color={theme.palette.neutral.main}
              >
                {user?.impressions}
              </Typography>
            </FlexBetween>
          </Box>
          <Divider sx={{ margin: "1rem 0" }} />
        </Box>
      )}

      <Box display={"flex"} gap={"1rem"} flexDirection={"column"}>
        <Typography
          variant="h5"
          fontWeight={700}
          color={theme.palette.neutral.main}
        >
          Social Profiles
        </Typography>
        <FlexBetween>
          <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
            <TwitterIcon sx={{ fontSize: "35px" }} />
            <Box>
              <Typography
                fontWeight={500}
                color={theme.palette.neutral.main}
                variant="h5"
              >
                Twitter
              </Typography>
              <Typography
                fontWeight={500}
                color={theme.palette.neutral.medium}
                variant="h6"
              >
                Social Network
              </Typography>
            </Box>
          </Box>
          <EditTwoToneIcon sx={{ fontSize: "25px" }} />
        </FlexBetween>
        <FlexBetween>
          <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
            <LinkedInIcon sx={{ fontSize: "35px" }} />
            <Box>
              <Typography
                fontWeight={500}
                color={theme.palette.neutral.main}
                variant="h5"
              >
                Linkedin
              </Typography>
              <Typography
                fontWeight={500}
                color={theme.palette.neutral.medium}
                variant="h6"
              >
                Network Platform
              </Typography>
            </Box>
          </Box>
          <EditTwoToneIcon sx={{ fontSize: "25px" }} />
        </FlexBetween>
      </Box>
    </Box>
  );
};

export default Profile;
