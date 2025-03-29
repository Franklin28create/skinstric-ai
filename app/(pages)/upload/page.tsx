"use client";

import { UploadOptions, NavigationArrows, Loader } from "@/app/components";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Upload = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isCameraLoader, setIsCameraLoader] = useState<boolean>(false);

  useEffect(() => {
    const name = localStorage.getItem("name");
    const location = localStorage.getItem("location");

    if (!name && !location) redirect("/intro");
  }, []);

  if (isLoading) return <Loader isCameraLoader={isCameraLoader} />;

  return (
    <section className="px-8 md:h-full max-lg:min-h-screen flex flex-col lg:relative overflow-x-hidden">
      <h1 className="uppercase font-bold max-sm:mt-2">To Start Analysis</h1>

      <div className="flex-1 flex items-center md:justify-between mx-auto w-full gap-10 max-md:flex-col lg:px-10">
        <UploadOptions
          option="camera"
          setIsLoading={setIsLoading}
          showModal={showModal}
          setShowModal={setShowModal}
          setIsCameraLoader={setIsCameraLoader}
        />
        <UploadOptions option="upload" setIsLoading={setIsLoading} />
      </div>

      <NavigationArrows handleLeftArrowClick={() => router.push("/intro")} />
    </section>
  );
};

export default Upload;
