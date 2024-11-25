export interface DMLimitResponse {
  isRequestDmLimitExceeded: boolean;
  newRequestDmTimestamp: number | null;
  userDmLimit: number | null;
}
