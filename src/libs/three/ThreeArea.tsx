import Three from "./Three";
import "./ThreeArea.scss";

export default function Page() {
  return (
    <>
      <div className="canvas">
        <Three
          spheres={[]}   
        />
      </div>
    </>
  );
}
