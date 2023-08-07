export interface DMLimitResponse {
  success: boolean;
  data: {
    isRequestDmLimitExceeded: boolean | null;
    newRequestDmTimestamp: string | null;
    userDmLimit: number | null;
  };
}
