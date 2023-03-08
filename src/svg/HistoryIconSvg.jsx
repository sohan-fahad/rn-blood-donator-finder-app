import * as React from "react";
import Svg, { Path } from "react-native-svg";
import colors from "../theme/colors";

const HistoryIconSvg = (props) => (
  <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M5.528 16.702a8 8 0 1 0-1.512-4.2m0 0-1.5-1.5m1.5 1.5 1.5-1.5"
      stroke={colors.red}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 8v4l3 3"
      stroke={colors.red}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default HistoryIconSvg;
