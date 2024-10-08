import axios from "axios";

const login = axios.create({
  baseURL: "http://localhost:8000/",
});

export const RegisterUser = (data) => {
  return login.post("feather/user/", data);
};

export const ValidateUser = (data) => {
  return login.get("feather/verify_user/" + data.url);
};

export const Login = (data) => {
  return login.post("feather/token/", data);
};

export const ChangePassword = (data) => {
  return login.post("feather/password/", data);
};

export const ChangePasswordResult = (data) => {
  return login.put("feather/password/" + data.url, data.body);
};
