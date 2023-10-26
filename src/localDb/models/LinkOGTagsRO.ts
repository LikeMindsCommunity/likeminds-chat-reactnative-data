import { LINK_OG_TAGS_RO, OPTIONAL_STRING } from "../constants";
import Realm from "realm";

export class LinkOGTagsRO extends Realm.Object<LinkOGTagsRO> {
  url?: string;
  title?: string;
  image?: string;
  description?: string;

  static schema: Realm.ObjectSchema = {
    name: LINK_OG_TAGS_RO,
    embedded: true,
    properties: {
      url: OPTIONAL_STRING,
      title: OPTIONAL_STRING,
      image: OPTIONAL_STRING,
      description: OPTIONAL_STRING,
    },
  };
}
