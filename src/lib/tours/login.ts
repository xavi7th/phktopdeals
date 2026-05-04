import { driver, type DriveStep } from "driver.js";

const steps: DriveStep[] = [
  {
    element: '[data-tour="login-email-input"]',
    popover: { title: "Enter your email", description: "Use the email address you registered with.", side: "bottom", align: "start" },
  },
  {
    element: '[data-tour="login-password-input"]',
    popover: { title: "Enter your password", description: "Type your account password.", side: "bottom", align: "start" },
  },
  {
    element: '[data-tour="login-submit-btn"]',
    popover: { title: "Sign in", description: "Click to access your account and wallet.", side: "left", align: "start" },
  },
  {
    element: '[data-tour="forgot-password-link"]',
    popover: { title: "Forgot password?", description: "Click if you need to reset your password.", side: "left", align: "start" },
  },
  {
    element: '[data-tour="register-section"]',
    popover: { title: "Create an account", description: "New here? Fill in your details to register.", side: "left", align: "start" },
  },
];

export function startLoginTour() {
  const driverObj = driver({ showProgress: true, animate: true, overlayOpacity: 0.4, steps });
  driverObj.drive();
}
