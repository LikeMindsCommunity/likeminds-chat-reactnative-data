interface ReportTag {
  id: number;
  name: string;
}

export interface GetReportTagsResponse {
  tags: ReportTag[];
}
