export const isAuthenticated = (state: any) => state.security.isAuthenticated;
export const loggedUser = (state: any) => state.security.user;
export const loginAction = (state: any) => state.security.loginAction;
export const errorMessage = (state: any) => state.security.errorMessage;
export const authenticationError = (state: any) => state.security.authenticationError;
