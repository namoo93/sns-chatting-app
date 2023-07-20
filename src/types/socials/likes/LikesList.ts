import User from '../../User';

interface LikeDocs {
  _id: string;
  post_id: string;
  user_id: number;
  __v: number;
  user_info: Partial<User>;
}

interface LikeList {
  docs: LikeDocs[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number;
  nextPage?: number;
}

export default LikeList;
