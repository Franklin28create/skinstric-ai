"use client";

import { CameraButtons, CameraCaption, Navbar } from "@/app/components";
import { useNavStatus } from "@/app/store/useNavStatus";
import { useUserInfo } from "@/app/store/useUserInfo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Camera = () => {
  const { visible, setVisible } = useNavStatus();
  const [isPictureTaken, setIsPictureTaken] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const { setImage } = useUserInfo();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    startCamera();

    return () => stopCamera();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopCamera();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!visible) setVisible(true);
  }, [visible]);

  useGSAP(() => {
    gsap.to(".camera_btn", {
      opacity: isPictureTaken ? 1 : 0,
      duration: 0.2,
      ease: "none",
    });
  }, [isPictureTaken]);

  const takePicture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/png");
      setCapturedImage(imageUrl);
    }
  };

  return (
    <div className="w-full max-h-screen h-full border overflow-y-hidden relative bg-secondary">
      <Navbar hideCodeButton />

      {!isPictureTaken ? (
        <div className="absolute top-[50%] max-md:top-[85%] max-md:right-[50%] max-md:translate-x-[50%] -translate-y-[50%] right-[20px] z-10">
          <button
            className={`flex items-center gap-4 font-light ${
              isPictureTaken ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => {
              takePicture();
              setIsPictureTaken((prev) => !prev);
            }}
          >
            <h1 className="uppercase text-primary-200 hidden sm:block">
              Take Picture
            </h1>
            <img src="/assets/camera_button.svg" alt="" />
          </button>
        </div>
      ) : (
        <div className="absolute z-50 -translate-x-[50%] max-md:top-[50%] md:bottom-[75%] left-[50%] font-light">
          <h1 className="text-primary-200 text-xl">Great shot!</h1>
        </div>
      )}

      <div className="text-white absolute -translate-x-[50%] max-md:top-[10%] md:bottom-[40px] left-[50%] invert z-10">
        <CameraCaption />
      </div>

      <CameraButtons
        isPictureTaken={isPictureTaken}
        handleBackClick={() => {
          if (capturedImage && isPictureTaken) {
            setCapturedImage("");
            setIsPictureTaken(false);
            startCamera();
          } else router.back();
        }}
        handleProceedClick={() => {
          if (capturedImage) {
            setImage(capturedImage);
            localStorage.setItem("image", capturedImage);
            stopCamera();
            router.push("/analysis");
          }
        }}
      />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="w-full h-screen overflow-y-hidden text-white">
        {capturedImage && isPictureTaken ? (
          <div className="w-full h-full relative">
            <img
              src={capturedImage}
              alt="Selfie"
              className="md:size-full max-md:zize-[100vw] max-md:absolute max-md:top-[25%] scale-x-[-1]"
            />
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="md:w-[100vw] max-md:h-[100vh]"
            style={{ transform: "scaleX(-1)" }}
          />
        )}
      </div>
    </div>
  );
};

export default Camera;
