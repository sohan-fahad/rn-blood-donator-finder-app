import * as React from "react";
import Svg, { Path } from "react-native-svg";
import colors from "../theme/colors";

const AlermIconSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      stroke={colors.red}
      strokeWidth={2}
    />
    <Path
      d="M12 7v4.52c0 .3.15.58.4.747v0L15 14M3 4l1-1M21 4l-1-1"
      stroke={colors.red}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default AlermIconSvg;
