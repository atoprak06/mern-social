import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import FlexBetween from "@/components/FlexBetween";
import { useLoginMutation, useRegisterMutation } from "@/api";
import { useDispatch } from "react-redux";
import { setLogin } from "@/state";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { FormInterface } from "../profilePage/types";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const yupValidation = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const yupValidationRegister = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    occupation: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required").min(8, "At least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), "password should match"])
      .required("Required"),
    picturePath: Yup.mixed().required("Require"),
  });
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { setErrors }) => {
      const response = await login(values);
      if ("data" in response) {
        dispatch(setLogin(response.data));
        navigate("/");
      } else {
        if (
          "data" in response.error &&
          (response.error.data as { msg: string }).msg ===
            "User does not exist."
        ) {
          setErrors({
            email: "User does not exist.",
          });
        } else {
          setErrors({
            password: "Invalid password",
          });
        }
      }
    },
    validationSchema: yupValidation,
  });
  const formikRegister = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      picturePath: File,
      location: "",
      occupation: "",
    },
    onSubmit: async (values, { setErrors }) => {
      const formData = new FormData();
      for (let value in values) {
        formData.append(
          value,
          values[value as keyof FormInterface] as string | File
        );
      }
      const response = await register(formData);
      if ("data" in response) {
        setLoginForm(true);
      } else {
        if ("data" in response.error) {
          setErrors({
            email: "User already exist.",
          });
        }
      }
    },
    validationSchema: yupValidationRegister,
  });
  const [loginForm, setLoginForm] = useState(true);

  const loginGrid = `
  "a"
  "b"
  "c"
  "d"
  `;

  const registerGrid = `
  "a a b b"
  "c c c c"
  "d d d d"
  "e e e e"
  "f f f f"
  "g g g g"
  "k k k k"
  "h h h h"
  "j j j j"  
  `;

  return (
    <FlexBetween flexDirection={"column"} gap={"2rem"} marginTop={"1rem"}>
      <Typography variant="h1" color={theme.palette.primary.main}>
        {loginForm ? "Login" : "Register"}
      </Typography>
      {loginForm ? (
        <form style={{ width: "60%" }} onSubmit={formik.handleSubmit}>
          <Box
            display={"grid"}
            gap={"1rem"}
            gridTemplateAreas={loginGrid}
            gridTemplateRows={"repeat(4,minmax(40px,1fr))"}
            gridTemplateColumns={"repeat(1,minmax(1fr,1fr)"}
          >
            <TextField
              autoComplete="false"
              sx={{ gridArea: "a" }}
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              autoComplete="false"
              sx={{ gridArea: "b" }}
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              sx={{
                gridArea: "c",
                color: theme.palette.neutral.dark,
                background: theme.palette.primary.main,
                "&:hover": { backgroundColor: theme.palette.primary[300] },
              }}
            >
              Login
            </Button>
            <Typography
              sx={{
                cursor: "pointer",
                color: theme.palette.primary.main,
                gridArea: "d",
              }}
              onClick={() => setLoginForm(false)}
              variant="h6"
            >
              Don't have an account ?
            </Typography>
          </Box>
        </form>
      ) : (
        <form
          style={{
            width: "60%",
            marginTop: "2rem",
          }}
          onSubmit={formikRegister.handleSubmit}
          encType="multipart/form-data"
        >
          <Box
            display={"grid"}
            gap={"1rem"}
            gridTemplateAreas={registerGrid}
            gridTemplateRows={"repeat(9,minmax(40px,1fr))"}
            gridTemplateColumns={"repeat(1,minmax(0,1fr)"}
          >
            <TextField
              autoComplete="false"
              sx={{ gridArea: "a" }}
              id="firstName"
              name="firstName"
              label="First Name"
              value={formikRegister.values.firstName}
              onChange={formikRegister.handleChange}
              error={
                formikRegister.touched.firstName &&
                Boolean(formikRegister.errors.firstName)
              }
              helperText={
                formikRegister.touched.firstName &&
                formikRegister.errors.firstName
              }
            />
            <TextField
              autoComplete="false"
              sx={{ gridArea: "b" }}
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formikRegister.values.lastName}
              onChange={formikRegister.handleChange}
              error={
                formikRegister.touched.lastName &&
                Boolean(formikRegister.errors.lastName)
              }
              helperText={
                formikRegister.touched.lastName &&
                formikRegister.errors.lastName
              }
            />
            <TextField
              autoComplete="false"
              sx={{ gridArea: "c" }}
              id="location"
              name="location"
              label="Location"
              value={formikRegister.values.location}
              onChange={formikRegister.handleChange}
              error={
                formikRegister.touched.location &&
                Boolean(formikRegister.errors.location)
              }
              helperText={
                formikRegister.touched.location &&
                formikRegister.errors.location
              }
            />
            <TextField
              autoComplete="false"
              sx={{ gridArea: "d" }}
              id="occupation"
              name="occupation"
              label="Occupation"
              value={formikRegister.values.occupation}
              onChange={formikRegister.handleChange}
              error={
                formikRegister.touched.occupation &&
                Boolean(formikRegister.errors.occupation)
              }
              helperText={
                formikRegister.touched.occupation &&
                formikRegister.errors.occupation
              }
            />
            <TextField
              autoComplete="false"
              sx={{ gridArea: "e" }}
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formikRegister.values.email}
              onChange={formikRegister.handleChange}
              error={
                formikRegister.touched.email &&
                Boolean(formikRegister.errors.email)
              }
              helperText={
                formikRegister.touched.email && formikRegister.errors.email
              }
            />
            <TextField
              autoComplete="false"
              sx={{ gridArea: "f" }}
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formikRegister.values.password}
              onChange={formikRegister.handleChange}
              error={
                formikRegister.touched.password &&
                Boolean(formikRegister.errors.password)
              }
              helperText={
                formikRegister.touched.password &&
                formikRegister.errors.password
              }
            />
            <TextField
              autoComplete="false"
              sx={{ gridArea: "g" }}
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formikRegister.values.confirmPassword}
              onChange={formikRegister.handleChange}
              error={
                formikRegister.touched.confirmPassword &&
                Boolean(formikRegister.errors.confirmPassword)
              }
              helperText={
                formikRegister.touched.confirmPassword &&
                formikRegister.errors.confirmPassword
              }
            />
            <Dropzone
              accept={{
                "image/jpeg": [".jpg", ".jpeg"],
                "image/png": [".png"],
              }}
              multiple={false}
              onDrop={(acceptedFiles) =>
                formikRegister.setFieldValue("picturePath", acceptedFiles[0])
              }
            >
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${theme.palette.primary.main}`}
                  p="1rem"
                  sx={{ "&:hover": { cursor: "pointer" }, gridArea: "k" }}
                >
                  <input {...getInputProps()} />
                  {!formikRegister.values.picturePath ? (
                    <p>Add Picture Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>
                        {formikRegister.values.picturePath.name}
                      </Typography>
                      <EditOutlinedIcon />
                    </FlexBetween>
                  )}
                </Box>
              )}
            </Dropzone>
            <Button
              type="submit"
              sx={{
                gridArea: "h",
                color: theme.palette.neutral.dark,
                background: theme.palette.primary.main,
                "&:hover": { backgroundColor: theme.palette.primary[300] },
              }}
            >
              Register
            </Button>
            <Typography
              onClick={() => setLoginForm(true)}
              variant="h6"
              sx={{
                gridArea: "j",
                cursor: "pointer",
                color: theme.palette.primary.main,
              }}
            >
              Already have an account?
            </Typography>
          </Box>
        </form>
      )}
    </FlexBetween>
  );
};

export default LoginForm;
