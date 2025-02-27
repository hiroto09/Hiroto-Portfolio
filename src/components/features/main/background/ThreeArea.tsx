import Three from "./Three";
import "./ThreeArea.scss";


export default function ThreeArea() {
  return (
    <>
      <div className="canvas">
        <Three
          spheres={[
            // [1, "#90A0FF", 0.5, [0, 3, 0]],
            // [0.5, "#90A9FF", 1, [0, 3, 0]],
            // [0.7, "#AAFAFF", 1, [0, 3, 0]],
            // [0.8, "#A0A0FF", 0.6, [0, 3, 0]],
          ]}   
        />
      </div>
    </>
  );
}
