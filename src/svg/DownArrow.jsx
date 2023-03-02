import * as React from "react";
import Svg, { Path } from "react-native-svg";
import colors from "../theme/colors";

const DownArrow = (props) => (
  <Svg
    width={props.width || 20}
    height={props.height || 20}
    viewBox="0 0 1024 1024"
    fill={colors.black}
    {...props}
  >
    <Path d="M759.2 419.8 697.4 358 512 543.4 326.6 358l-61.8 61.8L512 667z" />
  </Svg>
);

export default DownArrow;
