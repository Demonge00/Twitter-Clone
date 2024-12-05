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

export const GetUserInfo = (data) => {
  return login.get("feather/user/" + data.url, {
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
  });
};

export const ChangeUserProfile = (data) => {
  return login.put("feather/user/", data, {
    headers: {
      Authorization: "Bearer " + data.get("accessToken"),
      "Content-Type": "multipart/form-data",
    },
  });
};

export const ChangeFollow = (data) => {
  return login.post("feather/follow/", data.data, {
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
  });
};

export const Posting = (data) => {
  return login.post("feather/post/", data, {
    headers: {
      Authorization: "Bearer " + data.get("accessToken"),
      "Content-Type": "multipart/form-data",
    },
  });
};

export const Security = (data) => {
  return login.get("feather/security/", {
    headers: {
      Authorization: "Bearer " + data,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const TryRefreshToken = (data) => {
  return login.post("feather/token/refresh/", data);
};

export const GetList = (data) => {
  return login.get("feather/post/list", {
    headers: {
      Authorization: "Bearer " + data,
    },
  });
};
export const GetPostInfo = (data) => {
  return login.get("feather/post/" + data.pub_id, {
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
  });
};
export const ChangeLike = (data) => {
  return login.post("feather/post/like", data.data, {
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
  });
};
export const ChangeRetweet = (data) => {
  return login.post("feather/post/retweet", data.data, {
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
  });
};
export const ChangeBookmark = (data) => {
  return login.post("feather/post/bookmark", data.data, {
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
  });
};
