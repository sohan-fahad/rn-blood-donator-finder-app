import colors from "../../theme/colors";
import typography from "../../theme/typography";

const BASE = {
  fontFamily: typography.primary,
  fontSize: 16,
  color: colors.black,
};

const BASE_BOLD = {
  fontFamily: typography.primaryBold,
  fontSize: 16,
  color: colors.white,
};

const BOLD = {
  fontFamily: typography.secondary,
  color: colors.white,
};

export default presets = {
  default: BASE,
  bold: BOLD,
  h1: {
    fontSize: 32,
    color: colors.black,
  },
  h2: {
    fontSize: 28,
    color: colors.black,
  },
  h3: {
    fontSize: 24,
    color: colors.black,
  },
  h4: {
    fontSize: 14,
    color: colors.black,
  },
  small: {
    fontSize: 12,
    color: colors.black,
  },
};
