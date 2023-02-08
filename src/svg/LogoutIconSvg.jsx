import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";

const LogoutIconSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={34}
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke="#fff"
      strokeWidth={2.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M19.833 11.333V8.5A2.833 2.833 0 0 0 17 5.667H7.083A2.833 2.833 0 0 0 4.25 8.5v17a2.833 2.833 0 0 0 2.833 2.833H17a2.834 2.834 0 0 0 2.833-2.833v-2.833" />
      <Path d="M9.917 17H29.75l-4.25-4.25m0 8.5L29.75 17" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h34v34H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default LogoutIconSvg;
