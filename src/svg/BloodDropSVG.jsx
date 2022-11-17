import * as React from "react";
import Svg, { Path } from "react-native-svg";

const BloodDropSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={92}
    height={120}
    fill="none"
    {...props}
  >
    <Path
      d="M91.034 74.483C91.034 99.62 70.655 120 45.517 120S0 99.621 0 74.483C0 41.379 45.517 0 45.517 0s45.517 41.38 45.517 74.483Z"
      fill="#F2F2F2"
    />
    <Path
      d="M91.034 74.483C91.034 99.62 70.655 120 45.517 120V0s45.517 41.38 45.517 74.483Z"
      fill="#fff"
    />
    <Path
      d="M64.483 66.897h-11.38v-11.38H37.931v11.38h-11.38v15.172h11.38v11.38h15.172v-11.38h11.38V66.897Z"
      fill="#D70032"
    />
  </Svg>
);

export default BloodDropSVG;
