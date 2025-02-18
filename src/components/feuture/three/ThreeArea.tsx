
import Three from './Three';
import "./ThreeArea.scss";



export default function Page() {
  return (
    <>
      <div className="canvas">
        <Three
          spheres={[
            [1, 'lightblue', 0.05, [-4, -1, -1]],
            [0.75, 'lightblue', 0.1, [-4, 2, -2]],
            [1.25, 'lightblue', 0.2, [4, -3, 2]],
            [1.5, 'lightblue', 0.3, [-4, -2, -3]],
            [2, 'lightblue', 0.3, [-4, 2, -4]],
            [2, 'lightblue', 0.3, [-4, 2, -4]],
            [1.5, 'lightblue', 0.05, [-4, -1, -1]],
            [2, 'lightblue', 0.1, [-4, 2, -2]],
            [1.5, 'lightblue', 0.2, [4, -3, 2]],
            [1.25, 'lightblue', 0.3, [-4, -2, -3]],
            [1, 'lightblue', 0.3, [-4, 2, -4]],
            [1, 'lightblue', 0.3, [-4, 2, -4]]
          ]}
        />
      </div>
    </>
  );
}
