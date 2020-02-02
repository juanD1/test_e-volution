export interface ErrorResponse {
    status: number;
    code: string;
    description: string; 
    stack?: any;
  }