interface userDmLimit {
  state: number,
  duration: string,
  numberInDuration: number
}
export interface CheckDMLimit {
  isRequestDmLimitExceeded: boolean;
  newRequestDmTimestamp: number | null;
  userDmLimit: userDmLimit | null
  chatroomId: number;
}
