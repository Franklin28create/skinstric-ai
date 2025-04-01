import { userInfoType, UserUploadInformationType } from "@/types";
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

const uploadDemographics = async (data: UserUploadInformationType) => {
  try {
    const { name, location, gender, age, race } = data;
    const response = await axios.put("/api/update-demographics", {
      name: name.trim().toLowerCase(),
      location: location.trim(),
      gender,
      age,
      race,
    });

    return { message: response.data };
  } catch (error: any) {
    console.error(
      "Error updating demographics: ",
      error.response?.data || error.message
    );
  }
};

export { addUser, scanImage, uploadDemographics };
