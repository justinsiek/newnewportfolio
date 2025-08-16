"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-white">
      <AnimatePresence>
        {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
      </AnimatePresence>

      {!showLoader && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-4xl black">hero page</div>
        </div>
      )}
    </div>
  );
}
