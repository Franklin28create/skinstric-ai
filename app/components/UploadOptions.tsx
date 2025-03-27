import { UploadOptionsType } from "@/types";
import { Dispatch, SetStateAction, useRef } from "react";
import { useUserInfo } from "../store/useUserInfo";
import { redirect } from "next/navigation";
import { useNavStatus } from "../store/useNavStatus";

const Upload = ({
  option,
  setIsLoading,
}: {
  option: UploadOptionsType;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { setImage } = useUserInfo();
  const { setVisible } = useNavStatus();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
// TODO: Fetch AI API
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVisible(false);
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      setTimeout(() => {
        setIsLoading(false);
        setVisible(true);
        redirect("/analysis");
      }, 2000);
    }
  };

  switch (option) {
    case "camera":
      return (
        <img
          src="/assets/camera.svg"
          alt="camera"
          className="-translate-x-[50%] -translate-y-[50%] absolute top-[50%] left-[50%]"
        />
      );
    case "upload":
      return (
        <>
          <img
            src="/assets/gallery.svg"
            alt="camera"
            onClick={handleImageClick}
            className="-translate-x-[50%] -translate-y-[50%] absolute top-[50%] left-[50%]"
          />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleImageChange(e)}
            accept="image/*"
          />
        </>
      );
    default:
      break;
  }
};

const UploadOptions = ({
  option,
  setIsLoading,
}: {
  option: UploadOptionsType;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="w-full max-w-[40%] relative">
      <img src="/assets/rombuses.svg" className="w-full" alt="rombuses" />
      <Upload option={option} setIsLoading={setIsLoading} />
    </div>
  );
};

export default UploadOptions;
