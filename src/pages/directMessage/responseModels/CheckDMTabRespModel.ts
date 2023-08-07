export interface CheckDMTabResponse {
  success: boolean;
  data: {
    clicked: boolean;
    isCm: boolean;
    messaged: boolean;
  };
}
