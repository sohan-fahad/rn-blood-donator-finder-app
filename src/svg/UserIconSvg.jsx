import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const UserIconSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
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
      <Path d="M22 38.5c9.113 0 16.5-7.387 16.5-16.5S31.113 5.5 22 5.5 5.5 12.887 5.5 22 12.887 38.5 22 38.5Z" />
      <Path d="M22 23.833a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM11.308 34.556a7.334 7.334 0 0 1 7.025-5.223h7.334a7.334 7.334 0 0 1 7.029 5.235" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h44v44H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default UserIconSvg;
