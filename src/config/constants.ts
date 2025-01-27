
import axios from 'axios';

import Cookies from 'js-cookie';

export const URL="https://game-gate-api.onrender.com/api/v1";

export const axiosIn = axios.create({
  baseURL: URL,
});
 

export const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get("accessToken")}`  // Retrieve the access token from the cookies
    },
    withCredentials: false // Typically used for CORS requests; set to true if needed for credentials
  };

  export const configWithToken = () => {
    let token = Cookies.get("accessToken");
    token = token ? token.replace(/^"|"$/g, "").trim() : undefined; // Set undefined instead of null
    console.log("MY token in adminside now :", token);
    
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined, // Explicitly handle undefined
      },
      withCredentials: false,
    };
  };
  
  