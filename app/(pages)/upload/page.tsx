"use client";

import { UploadOptions, NavigationArrows, Loader } from "@/app/components";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Upload = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const name = localStorage.getItem("name");
    const location = localStorage.getItem("location");

    if (!name && !location) redirect("/intro");
  }, []);

  if (isLoading) return <Loader />;

  return (
    <section className="px-8 md:h-full max-lg:min-h-screen flex flex-col relative overflow-x-hidden">
      <h1 className="uppercase font-bold">To Start Analysis</h1>

      <div className="flex-1 flex items-center justify-center mx-auto w-full gap-10 max-md:flex-col">
        <UploadOptions option="camera" setIsLoading={setIsLoading} />
        <UploadOptions option="upload" setIsLoading={setIsLoading} />
      </div>

      <NavigationArrows handleLeftArrowClick={() => router.push("/intro")} />
    </section>
  );
};

export default Upload;
