"use client";

import { UploadOptions, NavigationArrows, Loader } from "@/app/components";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Upload = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  if (isLoading) return <Loader />;

  return (
    <div className="px-8 h-full flex flex-col">
      <h1 className="uppercase font-bold">To Start Analysis</h1>

      <div className="flex-1 flex items-center justify-center mx-auto w-full gap-10">
        <UploadOptions option="camera" setIsLoading={setIsLoading} />
        <UploadOptions option="upload" setIsLoading={setIsLoading} />
      </div>

      <NavigationArrows handleLeftArrowClick={() => router.push("/intro")} />
    </div>
  );
};

export default Upload;
