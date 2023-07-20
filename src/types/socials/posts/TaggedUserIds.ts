interface TaggedUserIds {
  id: number;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  profileBackground?: string;
  profileMessage?: string;
  birth?: string;
  recentlyUsedAt?: string;
  videoAble: number;
  callAble: number;
  contact: string;
  officialAccount: number;
  profileImage?: string;
  rememberMeToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default TaggedUserIds;
