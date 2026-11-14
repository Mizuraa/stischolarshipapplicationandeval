import Heropage from "./Pages/Heropage";
import Scholarships from "./Pages/Scholarships";
import Tracker from "./Components/Tracker";
import Know from "./Components/Know";

export default function Home() {
  return (
    <div className="flex flex-col w-full animate-fadeIn">
      <Heropage />
      <Tracker />
      <Scholarships />
      <Know />
    </div>
  );
}
