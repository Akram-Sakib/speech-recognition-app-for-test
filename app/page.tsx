import Image from "next/image";
// import Text from "./components/Text";

import dynamic from "next/dynamic";
// import Dictaphone from "./components/Dictaphone";
const Text = dynamic(() => import("./components/Text"), { ssr: false });
const Dictaphone = dynamic(() => import("./components/Dictaphone"), {
  ssr: false,
});

export const metadata = {
  title: "Live Speech To text",
  description: "🎙️ > 📝",
};

export default function Home() {
  return (
    <>
      {/* <Text />; */}
      <Dictaphone />;
    </>
  );
}
