import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import colors from "../theme/colors";

const SettingsSvg = (props) => (
  <Svg
    fill={colors.lightRed}
    width={40}
    height={40}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="m4 13.743-1 .579a1 1 0 0 0-.366 1.366l1.488 2.578a1 1 0 0 0 1.366.366L6.5 18.05a1.987 1.987 0 0 1 1.986 0l.02.011a1.989 1.989 0 0 1 1 1.724V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1.218a1.985 1.985 0 0 1 .995-1.721l.021-.012a1.987 1.987 0 0 1 1.986 0l1.008.582a1 1 0 0 0 1.366-.366l1.488-2.578a1 1 0 0 0-.37-1.365l-1-.579a1.994 1.994 0 0 1-1-1.733v-.021a1.991 1.991 0 0 1 1-1.732l1-.579a1 1 0 0 0 .366-1.366l-1.49-2.578a1 1 0 0 0-1.366-.366l-1.01.582a1.987 1.987 0 0 1-1.986 0l-.014-.01a1.989 1.989 0 0 1-1-1.724V3a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v1.294A1.856 1.856 0 0 1 8.57 5.9l-.153.088a1.855 1.855 0 0 1-1.853 0l-1.074-.62a1 1 0 0 0-1.366.366L2.636 8.312A1 1 0 0 0 3 9.678l1 .579a1.994 1.994 0 0 1 1 1.733v.021a1.991 1.991 0 0 1-1 1.732ZM12 9a3 3 0 1 1-3 3 3 3 0 0 1 3-3Z" />
  </Svg>
);

export default SettingsSvg;