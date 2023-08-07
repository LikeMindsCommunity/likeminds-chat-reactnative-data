interface ReportTag {
  id: number;
  name: string;
}

export interface ReportTagResponse {
  success: boolean;
  data: {
    reportTags: ReportTag[];
  };
}
