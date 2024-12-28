import axios from "axios";

const login = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
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
  return login.put("feather/user/" + data.get("url") + "/", data, {
    headers: {
      Authorization: "Bearer " + data.get("accessToken"),
      "Content-Type": "multipart/form-data",
    },
  });
};

export const ChangeFollow = (data) => {
  return login.post("feather/user/follow/", data.data, {
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
    },
  });
};

export const TryRefreshToken = (data) => {
  return login.post("feather/token/refresh/", data);
};
export const GetListForYou = (data) => {
  return login.get("feather/post/list/for_you/", {
    headers: {
      Authorization: "Bearer " + data,
    },
  });
};
export const GetListFollow = (data) => {
  return login.get("feather/post/list/follows/", {
    headers: {
      Authorization: "Bearer " + data,
    },
  });
};
export const GetListForYouAll = (data) => {
  return login.get("feather/post/list/for_you_all/", {
    headers: {
      Authorization: "Bearer " + data,
    },
  });
};
export const GetListTendences = (data) => {
  return login.get("feather/post/list/tendences/", {
    headers: {
      Authorization: "Bearer " + data,
    },
  });
};
export const GetListBookmarked = (data) => {
  return login.get("feather/post/list/bookmarks/", {
    headers: {
      Authorization: "Bearer " + data,
    },
  });
};
export const GetListPosts = (data) => {
  return login.get("feather/post/" + data.name_tag + "/list/posts/", {
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
  });
};
export const GetListResponses = (data) => {
  return login.get("feather/post/" + data.name_tag + "/list/responses/", {
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
  });
};
export const GetTweetResponses = (data) => {
  return login.get("feather/post/" + data.pub_id + "/list/tweet-responses/", {
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
  });
};
export const GetListLikes = (data) => {
  return login.get("feather/post/" + data.name_tag + "/list/likes/", {
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
  });
};
export const GetListMultimed = (data) => {
  return login.get("feather/post/" + data.name_tag + "/list/multimedia/", {
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
  });
};
export const GetPostInfo = (data) => {
  return login.get("feather/post/" + data.pub_id + "/", {
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
  });
};
export const ChangeLike = (data) => {
  return login.post("feather/post/like/", data.data, {
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
  });
};
export const ChangeRetweet = (data) => {
  return login.post("feather/post/retweet/", data.data, {
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
  });
};
export const ChangeBookmark = (data) => {
  return login.post("feather/post/bookmark/", data.data, {
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
  });
};
