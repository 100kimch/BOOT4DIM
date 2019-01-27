/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateNoticeInput = {
  id?: string | null,
  body: string,
  date: string,
  headerImgSrc?: string | null,
  isLike?: boolean | null,
  isModifying?: boolean | null,
  numComments?: number | null,
  numIssue: number,
  numLikes: number,
  numShares: number,
  themeColor?: boolean | null,
  title?: string | null,
};

export type UpdateNoticeInput = {
  id: string,
  body?: string | null,
  date?: string | null,
  headerImgSrc?: string | null,
  isLike?: boolean | null,
  isModifying?: boolean | null,
  numComments?: number | null,
  numIssue?: number | null,
  numLikes?: number | null,
  numShares?: number | null,
  themeColor?: boolean | null,
  title?: string | null,
};

export type DeleteNoticeInput = {
  id?: string | null,
};

export type CreateCommentInput = {
  id?: string | null,
  body: string,
};

export type UpdateCommentInput = {
  id: string,
  body?: string | null,
};

export type DeleteCommentInput = {
  id?: string | null,
};

export type CreateHistoryInput = {
  id?: string | null,
  date?: string | null,
  body: string,
};

export type UpdateHistoryInput = {
  id: string,
  date?: string | null,
  body?: string | null,
};

export type DeleteHistoryInput = {
  id?: string | null,
};

export type CreateTestingInput = {
  name: string,
};

export type UpdateTestingInput = {
  name?: string | null,
};

export type DeleteTestingInput = {
  id?: string | null,
};

export type CreateUserInput = {
  name: string,
};

export type UpdateUserInput = {
  name?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type ModelNoticeFilterInput = {
  id?: ModelIDFilterInput | null,
  body?: ModelStringFilterInput | null,
  date?: ModelStringFilterInput | null,
  headerImgSrc?: ModelStringFilterInput | null,
  isLike?: ModelBooleanFilterInput | null,
  isModifying?: ModelBooleanFilterInput | null,
  numComments?: ModelIntFilterInput | null,
  numIssue?: ModelIntFilterInput | null,
  numLikes?: ModelIntFilterInput | null,
  numShares?: ModelIntFilterInput | null,
  themeColor?: ModelBooleanFilterInput | null,
  title?: ModelStringFilterInput | null,
  and?: Array< ModelNoticeFilterInput | null > | null,
  or?: Array< ModelNoticeFilterInput | null > | null,
  not?: ModelNoticeFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelBooleanFilterInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDFilterInput | null,
  body?: ModelStringFilterInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
};

export type ModelHistoryFilterInput = {
  id?: ModelIDFilterInput | null,
  date?: ModelStringFilterInput | null,
  body?: ModelStringFilterInput | null,
  and?: Array< ModelHistoryFilterInput | null > | null,
  or?: Array< ModelHistoryFilterInput | null > | null,
  not?: ModelHistoryFilterInput | null,
};

export type ModelTestingFilterInput = {
  name?: ModelStringFilterInput | null,
  and?: Array< ModelTestingFilterInput | null > | null,
  or?: Array< ModelTestingFilterInput | null > | null,
  not?: ModelTestingFilterInput | null,
};

export type ModelUserFilterInput = {
  name?: ModelStringFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type CreateNoticeMutationVariables = {
  input: CreateNoticeInput,
};

export type CreateNoticeMutation = {
  createNotice:  {
    __typename: "Notice",
    id: string,
    body: string,
    comments:  Array< {
      __typename: "Comment",
      id: string,
      body: string,
    } >,
    contributor:  {
      __typename: "User",
      name: string,
    } | null,
    date: string,
    headerImgSrc: string | null,
    isLike: boolean | null,
    isModifying: boolean | null,
    numComments: number | null,
    numIssue: number,
    numLikes: number,
    numShares: number,
    themeColor: boolean | null,
    title: string | null,
  } | null,
};

export type UpdateNoticeMutationVariables = {
  input: UpdateNoticeInput,
};

export type UpdateNoticeMutation = {
  updateNotice:  {
    __typename: "Notice",
    id: string,
    body: string,
    comments:  Array< {
      __typename: "Comment",
      id: string,
      body: string,
    } >,
    contributor:  {
      __typename: "User",
      name: string,
    } | null,
    date: string,
    headerImgSrc: string | null,
    isLike: boolean | null,
    isModifying: boolean | null,
    numComments: number | null,
    numIssue: number,
    numLikes: number,
    numShares: number,
    themeColor: boolean | null,
    title: string | null,
  } | null,
};

export type DeleteNoticeMutationVariables = {
  input: DeleteNoticeInput,
};

export type DeleteNoticeMutation = {
  deleteNotice:  {
    __typename: "Notice",
    id: string,
    body: string,
    comments:  Array< {
      __typename: "Comment",
      id: string,
      body: string,
    } >,
    contributor:  {
      __typename: "User",
      name: string,
    } | null,
    date: string,
    headerImgSrc: string | null,
    isLike: boolean | null,
    isModifying: boolean | null,
    numComments: number | null,
    numIssue: number,
    numLikes: number,
    numShares: number,
    themeColor: boolean | null,
    title: string | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
};

export type CreateCommentMutation = {
  createComment:  {
    __typename: "Comment",
    id: string,
    body: string,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
};

export type UpdateCommentMutation = {
  updateComment:  {
    __typename: "Comment",
    id: string,
    body: string,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
};

export type DeleteCommentMutation = {
  deleteComment:  {
    __typename: "Comment",
    id: string,
    body: string,
  } | null,
};

export type CreateHistoryMutationVariables = {
  input: CreateHistoryInput,
};

export type CreateHistoryMutation = {
  createHistory:  {
    __typename: "History",
    id: string,
    date: string | null,
    body: string,
  } | null,
};

export type UpdateHistoryMutationVariables = {
  input: UpdateHistoryInput,
};

export type UpdateHistoryMutation = {
  updateHistory:  {
    __typename: "History",
    id: string,
    date: string | null,
    body: string,
  } | null,
};

export type DeleteHistoryMutationVariables = {
  input: DeleteHistoryInput,
};

export type DeleteHistoryMutation = {
  deleteHistory:  {
    __typename: "History",
    id: string,
    date: string | null,
    body: string,
  } | null,
};

export type CreateTestingMutationVariables = {
  input: CreateTestingInput,
};

export type CreateTestingMutation = {
  createTesting:  {
    __typename: "Testing",
    name: string,
  } | null,
};

export type UpdateTestingMutationVariables = {
  input: UpdateTestingInput,
};

export type UpdateTestingMutation = {
  updateTesting:  {
    __typename: "Testing",
    name: string,
  } | null,
};

export type DeleteTestingMutationVariables = {
  input: DeleteTestingInput,
};

export type DeleteTestingMutation = {
  deleteTesting:  {
    __typename: "Testing",
    name: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    name: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    name: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    name: string,
  } | null,
};

export type GetNoticeQueryVariables = {
  id: string,
};

export type GetNoticeQuery = {
  getNotice:  {
    __typename: "Notice",
    id: string,
    body: string,
    comments:  Array< {
      __typename: "Comment",
      id: string,
      body: string,
    } >,
    contributor:  {
      __typename: "User",
      name: string,
    } | null,
    date: string,
    headerImgSrc: string | null,
    isLike: boolean | null,
    isModifying: boolean | null,
    numComments: number | null,
    numIssue: number,
    numLikes: number,
    numShares: number,
    themeColor: boolean | null,
    title: string | null,
  } | null,
};

export type ListNoticesQueryVariables = {
  filter?: ModelNoticeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNoticesQuery = {
  listNotices:  {
    __typename: "ModelNoticeConnection",
    items:  Array< {
      __typename: "Notice",
      id: string,
      body: string,
      comments:  Array< {
        __typename: "Comment",
        id: string,
        body: string,
      } >,
      contributor:  {
        __typename: "User",
        name: string,
      } | null,
      date: string,
      headerImgSrc: string | null,
      isLike: boolean | null,
      isModifying: boolean | null,
      numComments: number | null,
      numIssue: number,
      numLikes: number,
      numShares: number,
      themeColor: boolean | null,
      title: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment:  {
    __typename: "Comment",
    id: string,
    body: string,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      body: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetHistoryQueryVariables = {
  id: string,
};

export type GetHistoryQuery = {
  getHistory:  {
    __typename: "History",
    id: string,
    date: string | null,
    body: string,
  } | null,
};

export type ListHistorysQueryVariables = {
  filter?: ModelHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHistorysQuery = {
  listHistorys:  {
    __typename: "ModelHistoryConnection",
    items:  Array< {
      __typename: "History",
      id: string,
      date: string | null,
      body: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTestingQueryVariables = {
  id: string,
};

export type GetTestingQuery = {
  getTesting:  {
    __typename: "Testing",
    name: string,
  } | null,
};

export type ListTestingsQueryVariables = {
  filter?: ModelTestingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTestingsQuery = {
  listTestings:  {
    __typename: "ModelTestingConnection",
    items:  Array< {
      __typename: "Testing",
      name: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    name: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      name: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateNoticeSubscription = {
  onCreateNotice:  {
    __typename: "Notice",
    id: string,
    body: string,
    comments:  Array< {
      __typename: "Comment",
      id: string,
      body: string,
    } >,
    contributor:  {
      __typename: "User",
      name: string,
    } | null,
    date: string,
    headerImgSrc: string | null,
    isLike: boolean | null,
    isModifying: boolean | null,
    numComments: number | null,
    numIssue: number,
    numLikes: number,
    numShares: number,
    themeColor: boolean | null,
    title: string | null,
  } | null,
};

export type OnUpdateNoticeSubscription = {
  onUpdateNotice:  {
    __typename: "Notice",
    id: string,
    body: string,
    comments:  Array< {
      __typename: "Comment",
      id: string,
      body: string,
    } >,
    contributor:  {
      __typename: "User",
      name: string,
    } | null,
    date: string,
    headerImgSrc: string | null,
    isLike: boolean | null,
    isModifying: boolean | null,
    numComments: number | null,
    numIssue: number,
    numLikes: number,
    numShares: number,
    themeColor: boolean | null,
    title: string | null,
  } | null,
};

export type OnDeleteNoticeSubscription = {
  onDeleteNotice:  {
    __typename: "Notice",
    id: string,
    body: string,
    comments:  Array< {
      __typename: "Comment",
      id: string,
      body: string,
    } >,
    contributor:  {
      __typename: "User",
      name: string,
    } | null,
    date: string,
    headerImgSrc: string | null,
    isLike: boolean | null,
    isModifying: boolean | null,
    numComments: number | null,
    numIssue: number,
    numLikes: number,
    numShares: number,
    themeColor: boolean | null,
    title: string | null,
  } | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment:  {
    __typename: "Comment",
    id: string,
    body: string,
  } | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment:  {
    __typename: "Comment",
    id: string,
    body: string,
  } | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment:  {
    __typename: "Comment",
    id: string,
    body: string,
  } | null,
};

export type OnCreateHistorySubscription = {
  onCreateHistory:  {
    __typename: "History",
    id: string,
    date: string | null,
    body: string,
  } | null,
};

export type OnUpdateHistorySubscription = {
  onUpdateHistory:  {
    __typename: "History",
    id: string,
    date: string | null,
    body: string,
  } | null,
};

export type OnDeleteHistorySubscription = {
  onDeleteHistory:  {
    __typename: "History",
    id: string,
    date: string | null,
    body: string,
  } | null,
};

export type OnCreateTestingSubscription = {
  onCreateTesting:  {
    __typename: "Testing",
    name: string,
  } | null,
};

export type OnUpdateTestingSubscription = {
  onUpdateTesting:  {
    __typename: "Testing",
    name: string,
  } | null,
};

export type OnDeleteTestingSubscription = {
  onDeleteTesting:  {
    __typename: "Testing",
    name: string,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    name: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    name: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    name: string,
  } | null,
};
