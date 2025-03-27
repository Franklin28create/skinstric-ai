"use client";

import { useNavStatus } from "@/app/store/useNavStatus";
import { useEffect } from "react";

const Analysis = () => {
  const { visible, setVisible } = useNavStatus();
  useEffect(() => {
    if (!visible) setVisible(true);
  }, []);

  return <div>Analysis</div>;
};

export default Analysis;
