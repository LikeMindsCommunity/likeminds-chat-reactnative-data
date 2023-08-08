import { SDKClientInfo } from "./SDKClientInfo";

export interface User {
  id: string;
  image_url: string;
  is_guest: boolean;
  name: string;
  organisation_name: string | null;
  sdk_client_info: SDKClientInfo | null;
  is_deleted?: boolean | null;
  custom_title?: string | null;
  updated_at?: number | null;
  user_unique_id: string;
  uuid: string;
  is_owner?: boolean | null;
}
