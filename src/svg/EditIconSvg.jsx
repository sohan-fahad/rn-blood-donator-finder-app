import * as React from "react";
import Svg, { Path } from "react-native-svg";
import colors from "../theme/colors";
/* SVGR has dropped some elements not supported by react-native-svg: title */

const EditIconSvg = (props) => (
  <Svg
    fill={colors.lightRed}
    width={40}
    height={40}
    viewBox="-4 0 32 32"
    {...props}
  >
    <Path d="M17.438 22.469v-4.031l2.5-2.5v7.344c0 1.469-1.219 2.688-2.656 2.688H2.657c-1.469 0-2.656-1.219-2.656-2.688V8.688C.001 7.219 1.189 6 2.657 6h14.844v.031l-2.5 2.469h-11.5c-.531 0-1 .469-1 1.031v12.938c0 .563.469 1 1 1h12.938c.531 0 1-.438 1-1zm2.375-15.25 2.656 2.656 1.219-1.219L21.032 6zm-9.344 9.375 2.625 2.656 8.469-8.469-2.625-2.656zm-1.875 4.5 3.625-.969-2.656-2.656z" />
  </Svg>
);

export default EditIconSvg;