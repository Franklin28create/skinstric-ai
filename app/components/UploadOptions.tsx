import { UploadOptionsType } from "@/types";
import { Dispatch, SetStateAction, useRef } from "react";
import { useUserInfo } from "../store/useUserInfo";
import { redirect } from "next/navigation";
import { useNavStatus } from "../store/useNavStatus";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Upload = ({
  option,
  setIsLoading,
}: {
  option: UploadOptionsType;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { image, setImage } = useUserInfo();
  const { setVisible } = useNavStatus();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  // TODO: Fetch AI API
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setVisible(false);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setTimeout(() => {
        setIsLoading(false);
        redirect("/analysis");
      }, 2000);
    } else {
      alert("Error Trying to upload image, please try again!");
    }
  };

  switch (option) {
    case "camera":
      return (
        <div className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">
          <div className="relative w-full h-full">
            <img src="/assets/camera.svg" alt="camera" id="camera_icon" />
            <div className="border w-[45px] -rotate-45 absolute top-[12px] right-[6%] max-md:right-[4%] translate-x-[50%]" />
            <div className="border w-[5px] h-[5px] absolute top-0 rounded-full right-0 translate-x-[225%] max-md:translate-x-[280%] -translate-y-[135%]" />
            <h1 className="absolute top-0 right-0 translate-x-[115%] -translate-y-[65%] max-md:-translate-y-[60%] font-light uppercase">
              Allow A.I to
              <br />
              scan your face
            </h1>
          </div>
        </div>
      );
    case "upload":
      return (
        <div className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">
          <img
            src="/assets/gallery.svg"
            alt="camera"
            onClick={handleImageClick}
          />
          <div className="border w-[45px] -rotate-45 absolute bottom-0 left-[35%] max-md:right-[4%] -translate-x-[100%]" />
          <div className="border w-[5px] h-[5px] absolute bottom-0 rounded-full left-0 max-md:left-[7%] max-md:-translate-x-[65%] max-sm:-translate-x-[200%] translate-x-[100%] translate-y-[385%]" />
          <h1 className="absolute bottom-0 left-0 -translate-x-[100%]  max-md:-translate-x-[105%] translate-y-[100%] max-md:translate-y-[68%] font-light text-right uppercase">
            Allow A.I. access Gallery
          </h1>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleImageChange(e)}
            accept="image/*"
          />
        </div>
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
  useGSAP(() => {
    gsap.to("#camera_icon", {
      rotation: 360,
      repeat: -1,
      duration: 5,
      ease: "none",
    });
  }, []);

  return (
    <div className="w-full max-w-[40%] max-md:max-w-[70%] relative">
      <img
        src="/assets/rombuses.svg"
        className="w-full pointer-events-none rombus_img"
        alt="rombuses"
      />
      <Upload option={option} setIsLoading={setIsLoading} />
    </div>
  );
};

export default UploadOptions;
