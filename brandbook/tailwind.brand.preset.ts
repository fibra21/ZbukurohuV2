import tokens from './tokens.json' assert { type: 'json' };

const preset = {
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.brand.primary,
        secondary: tokens.colors.brand.secondary,
        accent: tokens.colors.brand.accent,
        text: {
          primary: tokens.colors.text.primary,
          muted: tokens.colors.text.muted,
          inverse: tokens.colors.text.inverse,
        },
        surface: {
          base: tokens.colors.surface.base,
          muted: tokens.colors.surface.muted,
          contrast: tokens.colors.surface.contrast,
        },
        state: tokens.colors.state,
      },
      fontFamily: {
        heading: tokens.typography.font.heading.split(',').map(s => s.trim().replace(/^'|'$/g, '')),
        body: tokens.typography.font.body.split(',').map(s => s.trim().replace(/^'|'$/g, '')),
      },
      fontSize: {
        xs: [tokens.typography.size.xs, { lineHeight: tokens.typography.lineHeight.normal }],
        sm: [tokens.typography.size.sm, { lineHeight: tokens.typography.lineHeight.normal }],
        base: [tokens.typography.size.base, { lineHeight: tokens.typography.lineHeight.normal }],
        lg: [tokens.typography.size.lg, { lineHeight: tokens.typography.lineHeight.relaxed }],
        xl: [tokens.typography.size.xl, { lineHeight: tokens.typography.lineHeight.relaxed }],
        '2xl': [tokens.typography.size["2xl"], { lineHeight: tokens.typography.lineHeight.snug }],
        '3xl': [tokens.typography.size["3xl"], { lineHeight: tokens.typography.lineHeight.snug }],
        '4xl': [tokens.typography.size["4xl"], { lineHeight: tokens.typography.lineHeight.tight }],
        '5xl': [tokens.typography.size["5xl"], { lineHeight: tokens.typography.lineHeight.tight }],
      },
      borderRadius: {
        sm: tokens.radius.sm,
        md: tokens.radius.md,
        lg: tokens.radius.lg,
        xl: tokens.radius.xl,
        '2xl': tokens.radius["2xl"],
      },
      boxShadow: {
        sm: tokens.shadow.sm,
        md: tokens.shadow.md,
        lg: tokens.shadow.lg,
      },
      spacing: {
        4: tokens.spacing["4"],
        8: tokens.spacing["8"],
        12: tokens.spacing["12"],
        16: tokens.spacing["16"],
        20: tokens.spacing["20"],
        24: tokens.spacing["24"],
        32: tokens.spacing["32"],
        40: tokens.spacing["40"],
      },
      transitionDuration: {
        fast: tokens.motion.duration.fast,
        DEFAULT: tokens.motion.duration.base,
        slow: tokens.motion.duration.slow,
      },
      transitionTimingFunction: {
        standard: tokens.motion.ease.standard,
      },
    },
  },
};

export default preset;
