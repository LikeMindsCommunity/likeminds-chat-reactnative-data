import { MemberRO } from "./MemberRO";

export interface ReactionRO {
  member?: MemberRO | null;
  reaction: string;
}
