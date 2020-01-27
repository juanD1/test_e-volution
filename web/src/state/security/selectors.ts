export const isAuthenticated = (state: any) => state.security.isAuthenticated;
export const loggedUser = (state: any) => state.security.user;
export const errorMessage = (state: any) => state.security.errorMessage;
export const securityAction = (state: any) => state.security.securityAction;
export const securityError = (state: any) => state.security.securityError;
