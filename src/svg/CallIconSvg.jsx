import * as React from "react";
import Svg, { Path } from "react-native-svg";
import colors from "../theme/colors";
const CallIconSvg = (props) => (
  <Svg
    width={35}
    height={40}
    fill="none"
    stroke={colors.red}
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path stroke="none" d="M0 0h24v24H0z" />
    <Path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </Svg>
);
export default CallIconSvg;
