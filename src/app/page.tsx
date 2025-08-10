"use client";

import Image from "next/image";
import { useState } from "react";
import Loader from "@/components/Loader";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <div className="h-screen w-screen">
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
      <div>hi</div>
    </div>
  );
}
