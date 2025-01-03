export interface Widget {
    id: string;
    parentEntityId: string;
    parentEntityType: string;
    metadata: string;
    LmMeta?: string | null;
    createdAt: number;
    updatedAt: number;
  };
  