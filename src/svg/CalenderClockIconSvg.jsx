import * as React from "react";
import Svg, { Path } from "react-native-svg";
import colors from "../theme/colors";

const CalenderClockIconSvg = (props) => (
  <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M16 15.2v1.688l.9 1.012M9 11H4m16-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3m6-18v4M9 3v4m11.5 10a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
      stroke={colors.red}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CalenderClockIconSvg;
