import { MemberRO } from "./MemberRO";

export interface PollRO {
  id: string;
  text: string;
  subText?: string | null;
  isSelected?: boolean | null;
  percentage?: number | null;
  noVotes?: number | null;
  member?: MemberRO | null;
}
