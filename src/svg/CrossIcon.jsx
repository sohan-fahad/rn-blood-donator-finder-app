import * as React from "react";
import Svg, { Path } from "react-native-svg";
import colors from "../theme/colors";

const CrossIcon = (props) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 24 24"
    fill="none"
    stroke={colors.red}
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.95 8.464a1 1 0 1 0-1.414-1.414L12 10.586 8.465 7.05A1 1 0 0 0 7.05 8.464L10.586 12 7.05 15.536a1 1 0 1 0 1.415 1.414L12 13.414l3.536 3.536a1 1 0 1 0 1.414-1.414L13.414 12l3.536-3.536Z"
      fill={colors.red}
    />
  </Svg>
);

export default CrossIcon;
