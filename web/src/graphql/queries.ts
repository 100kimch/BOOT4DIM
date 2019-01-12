// tslint:disable
// this is an auto generated file. This will be overwritten

export const getNotice = `query GetNotice($id: ID!) {
  getNotice(id: $id) {
    id
    body
    comments {
      id
      body
    }
    contributor {
      label
    }
    date
    headerImgSrc
    isLike
    isModifying
    numComments
    numIssue
    numLikes
    numShares
    themeColor
    title
  }
}
`;
export const listNotices = `query ListNotices(
  $filter: ModelNoticeFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotices(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      body
      comments {
        id
        body
      }
      contributor {
        label
      }
      date
      headerImgSrc
      isLike
      isModifying
      numComments
      numIssue
      numLikes
      numShares
      themeColor
      title
    }
    nextToken
  }
}
`;
export const getComment = `query GetComment($id: ID!) {
  getComment(id: $id) {
    id
    body
  }
}
`;
export const listComments = `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      body
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    label
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      label
    }
    nextToken
  }
}
`;
