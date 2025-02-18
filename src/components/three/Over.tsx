
import Three from './Three';
import { Title } from '../title/Title';
import { color } from 'three/tsl';

function Overlay() {
  return (
      <Title />
  );
}
export default function Page() {
  return (
    <>
      <Three
        spheres={[
          [0.75, 'red', 0.1, [-4, 2, -2]],
          [1.25, 'red', 0.2, [4, -3, 2]],
          [1.5, 'red', 0.3, [-4, -2, -3]],
          [2, 'red', 0.3, [-4, 2, -4]],
          [2, 'red', 0.3, [-4, 2, -4]],
          [1.5, 'red', 0.05, [-4, -1, -1]],
          [2, 'red', 0.1, [-4, 2, -2]],
          [1.5, 'red', 0.2, [4, -3, 2]],
          [1.25, 'red', 0.3, [-4, -2, -3]],
          [1, 'red', 0.3, [-4, 2, -4]],
          [1, 'red', 0.3, [-4, 2, -4]]
        ]}
      />
      <Overlay />
    </>
  );
}
