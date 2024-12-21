import {
  useContext,
  createContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";

const userContext = createContext();

export function useUserDetails() {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("Esta funcion se usa solo con contexts.");
  }
  return context;
}

export function UserDetailsProvider(props) {
  const jsonParsed = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;
  var userAccessToken = false;
  var userRefreshToken = false;
  var userName = false;
  var profile_pic = false;
  var userNameId;
  if (jsonParsed) {
    if (jsonParsed.accessToken) {
      userAccessToken = jsonParsed.accessToken;
      userName = jwtDecode(userAccessToken).name;
      userNameId = jwtDecode(userAccessToken).name_tag;
      profile_pic = jwtDecode(userAccessToken).profile_pic;
    } else {
      userAccessToken = false;
      userName = false;
      userNameId = false;
    }
    userRefreshToken = jsonParsed.refreshToken
      ? jsonParsed.refreshToken
      : false;
  }
  const [userInfo, setUserInfo] = useState({
    accessToken: userAccessToken,
    refreshToken: userRefreshToken,
    name: userName,
    name_tag: userNameId,
    profile_pic: profile_pic,
  });
  const updateUserInfo = useCallback(
    (accessToken, refreshToken) => {
      const newUserInfo = { ...userInfo };
      newUserInfo.accessToken = accessToken;
      newUserInfo.refreshToken = refreshToken;
      if (accessToken === false) {
        newUserInfo.name = false;
        newUserInfo.name_tag = false;
        newUserInfo.profile_pic = false;
      } else {
        const jwt_decoded = jwtDecode(newUserInfo.accessToken);
        newUserInfo.name = jwt_decoded.name;
        newUserInfo.name_tag = jwt_decoded.name_tag;
        newUserInfo.profile_pic = jwt_decoded.profile_pic;
      }
      setUserInfo(newUserInfo);
      localStorage.setItem("userDetails", JSON.stringify(newUserInfo));
    },
    [userInfo]
  );
  const value = useMemo(() => {
    return { userInfo, updateUserInfo };
  }, [updateUserInfo, userInfo]);
  return <userContext.Provider value={value} {...props} />;
}
