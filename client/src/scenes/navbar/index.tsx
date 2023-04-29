import FlexBetween from "@/components/FlexBetween";
import {
  Typography,
  useTheme,
  TextField,
  InputAdornment,
  IconButton,
  useMediaQuery,
  Menu,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateInterface } from "@/api/types";
import { setMode, setLogout } from "@/state";
import { useNavigate } from "react-router-dom";
/* Icons */
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
/* */

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector<StateInterface>(
    (state) => state.persistedReducer.token
  ) as string;
  const theme = useTheme();

  const [searchValue, setSearchValue] = useState<string | null>("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl?.parentElement);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const changeColorMode = () => {
    dispatch(setMode(theme.palette.mode === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <div className="Navbar">
      <FlexBetween
        p={"1rem 6%"}
        sx={{ backgroundColor: theme.palette.background.alt }}
      >
        <FlexBetween gap={2}>
          <Typography
            onClick={() => {
              navigate("/");
            }}
            variant="h2"
            fontWeight={700}
            color={theme.palette.primary.main}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.light,
              },
            }}
          >
            Popularity
          </Typography>
          {!isSmallScreen && (
            <TextField
              value={searchValue}
              onChange={handleSearchValueChange}
              size="small"
              label="Search..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          )}
        </FlexBetween>
        {isSmallScreen ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
              <FlexBetween flexDirection={"column"} gap={1}>
                <IconButton
                  onClick={changeColorMode}
                  sx={{
                    width: "100%",
                    borderRadius: 0,
                  }}
                >
                  {
                    <FlexBetween gap={1}>
                      {theme.palette.mode === "dark" ? (
                        <LightModeIcon />
                      ) : (
                        <DarkModeIcon />
                      )}
                      <Typography>Set Mode</Typography>
                    </FlexBetween>
                  }
                </IconButton>
                <IconButton sx={{ width: "100%", borderRadius: 0 }}>
                  <FlexBetween gap={1} alignContent={"center"}>
                    <MessageIcon />
                    <Typography variant="h6">Messages</Typography>
                  </FlexBetween>
                </IconButton>
                <IconButton sx={{ width: "100%", borderRadius: 0 }}>
                  <FlexBetween gap={1} alignContent={"center"}>
                    <NotificationsIcon />
                    <Typography variant="h6">Notifications</Typography>
                  </FlexBetween>
                </IconButton>
                <IconButton sx={{ width: "100%", borderRadius: 0 }}>
                  <FlexBetween gap={1} alignContent={"center"}>
                    <HelpIcon />
                    <Typography variant="h6">Help</Typography>
                  </FlexBetween>
                </IconButton>
                <TextField
                  onChange={handleSearchValueChange}
                  value={searchValue}
                  sx={{ marginX: 2 }}
                  size="small"
                  label="Search..."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                {token && (
                  <IconButton
                    onClick={handleLogout}
                    sx={{ width: "100%", borderRadius: 0 }}
                  >
                    <FlexBetween gap={1}>
                      <LogoutIcon />
                      <Typography variant="h6">Log Out</Typography>
                    </FlexBetween>
                  </IconButton>
                )}
              </FlexBetween>
            </Menu>
          </>
        ) : (
          <FlexBetween gap={2}>
            <IconButton onClick={changeColorMode}>
              {theme.palette.mode === "dark" ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
            <IconButton>
              <MessageIcon />
            </IconButton>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton>
              <HelpIcon />
            </IconButton>
            {token && (
              <IconButton onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            )}
          </FlexBetween>
        )}
      </FlexBetween>
    </div>
  );
};

export default Navbar;
