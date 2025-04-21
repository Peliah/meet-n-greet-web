import { Variants } from "framer-motion";

// Page transitions
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

// Card animations
export const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: { 
      delay: custom * 0.1,
      duration: 0.5,
      type: "spring",
      stiffness: 100
    }
  }),
  hover: { 
    y: -10,
    boxShadow: "10px 10px 0px rgba(0, 0, 0, 1)",
    transition: { 
      duration: 0.2, 
      ease: "easeInOut"
    }
  },
  tap: { 
    scale: 0.98,
    boxShadow: "5px 5px 0px rgba(0, 0, 0, 1)",
    transition: { 
      duration: 0.1, 
      ease: "easeInOut"
    }
  }
};

// Button animations
export const buttonVariants: Variants = {
  hover: { 
    scale: 1.05,
    boxShadow: "5px 5px 0px rgba(0, 0, 0, 1)",
    y: -5,
    transition: { 
      duration: 0.2, 
      ease: "easeInOut"
    }
  },
  tap: { 
    scale: 0.95,
    boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
    y: 0,
    transition: { 
      duration: 0.1, 
      ease: "easeInOut"
    }
  }
};

// List item animations
export const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: { 
      delay: custom * 0.05,
      duration: 0.4,
      ease: "easeOut"
    }
  })
};

// Menu animations
export const menuVariants: Variants = {
  closed: { 
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: {
      duration: 0.2
    }
  },
  open: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Input animations
export const inputVariants: Variants = {
  focused: { 
    scale: 1.02,
    boxShadow: "5px 5px 0px rgba(0, 0, 0, 1)",
    transition: {
      duration: 0.2
    }
  },
  unfocused: { 
    scale: 1,
    boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
    transition: {
      duration: 0.2
    }
  }
};