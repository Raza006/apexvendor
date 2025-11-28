// 🎨 THEME CONFIGURATION PANEL
// Change these colors to update the entire site's theme instantly.

export const themeConfig = {
  colors: {
    // PRIMARY ACCENT (Used for highlights, glowing borders on Elite items, buttons)
    // Recommended: A strong, vibrant color like Gold, Red, Blue, or Cyan.
    primary: {
      DEFAULT: "#ef4444", // Red-500
      glow: "rgba(239, 68, 68, 0.5)", // Red glow
      text: "#f87171", // Red-400 (text contrast)
    },

    // SECONDARY ACCENT (Used for subtle gradients, secondary buttons)
    secondary: {
      DEFAULT: "#3b82f6", // Blue-500
      glow: "rgba(59, 130, 246, 0.3)",
    },

    // BACKGROUND ACCENTS (The ambient blobs in the corners)
    backgroundGradients: {
      topLeft: "rgba(8, 145, 178, 0.2)", // Cyan-900/20
      topRight: "rgba(30, 58, 138, 0.2)", // Blue-900/20
      bottomLeft: "rgba(23, 37, 84, 0.3)", // Blue-950/30
    }
  },
  
  // Font settings are handled in layout.tsx/globals.css but configured here conceptually
  fonts: {
    main: "Space Grotesk",
  }
};

