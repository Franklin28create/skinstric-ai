import { userInfoType } from "@/types";
import axios from "axios";

const addUser = async (userInfo: userInfoType) => {
  try {
    const { name, origin } = userInfo;
    const response = await axios.post(
      "/api/skinstricPhaseOne",
      {
        name: name,
        location: origin,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, response: response.data };
  } catch (error) {
    console.log("Error while adding user: ", error);
    return { success: false };
  }
};

const scanImage = async (image: string) => {
  try {
    const response = await axios.post(
      "/api/skinstricPhaseTwo",
      { image },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export { addUser, scanImage };
