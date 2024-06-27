import { StringUtils } from "@azure/msal-browser";

/* Defines the user entity */
export interface User {
  id: number;
  userName: string;
  role: string;
  mvpRoleType: string;
  landingPagePath: string;
  isAcceptTerm: boolean;
  userType: number;
}
