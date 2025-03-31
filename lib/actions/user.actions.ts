import { userInfoType } from "@/types";
import axios from "axios";

const addUser = async (userInfo: userInfoType) => {
  try {
    const { name, origin } = userInfo;
    const {
      data: { message },
    } = await axios.post(
      "/api/users",
      {
        name,
        location: origin,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { message };
  } catch (error: any) {
    console.log("Error while adding user: ", error);
    const errorMessage =
      error?.response?.data?.error || "Something went wrong!";
    return { error: errorMessage };
  }
};

const scanImage = async (image: string) => {
  try {
    const response = await axios.post(
      "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
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
