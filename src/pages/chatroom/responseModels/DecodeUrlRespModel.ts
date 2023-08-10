interface OgTags {
  description: string;
  image: string;
  title: string;
  url: string;
}

export interface DecodeUrlResponse {
  success: boolean;
  data: {
    ogTags: OgTags;
  };
}
