"use client";

import dynamic from "next/dynamic";

const StageViewer = dynamic(() => import("./StageViewer"), { ssr: false });

export default function StageViewerWrapper() {
  return <StageViewer />;
}
