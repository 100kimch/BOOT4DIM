// tslint:disable
// this is an auto generated file. This will be overwritten

export const createNotice = `mutation CreateNotice($input: CreateNoticeInput!) {
  createNotice(input: $input) {
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
export const updateNotice = `mutation UpdateNotice($input: UpdateNoticeInput!) {
  updateNotice(input: $input) {
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
export const deleteNotice = `mutation DeleteNotice($input: DeleteNoticeInput!) {
  deleteNotice(input: $input) {
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
export const createComment = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    id
    body
  }
}
`;
export const updateComment = `mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    id
    body
  }
}
`;
export const deleteComment = `mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    id
    body
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    label
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    label
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    label
  }
}
`;
