import { useState } from "react";
import GuideRegister from "../components/organisms/GuideRegister";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

function GuidesView() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div>
      <Topbar />
      <GuideRegister/>
      <Footer />
    </div>
  );
}

export default GuidesView;
