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
      name
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
      name
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
      name
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
export const createHistory = `mutation CreateHistory($input: CreateHistoryInput!) {
  createHistory(input: $input) {
    id
    date
    body
  }
}
`;
export const updateHistory = `mutation UpdateHistory($input: UpdateHistoryInput!) {
  updateHistory(input: $input) {
    id
    date
    body
  }
}
`;
export const deleteHistory = `mutation DeleteHistory($input: DeleteHistoryInput!) {
  deleteHistory(input: $input) {
    id
    date
    body
  }
}
`;
export const createTesting = `mutation CreateTesting($input: CreateTestingInput!) {
  createTesting(input: $input) {
    name
  }
}
`;
export const updateTesting = `mutation UpdateTesting($input: UpdateTestingInput!) {
  updateTesting(input: $input) {
    name
  }
}
`;
export const deleteTesting = `mutation DeleteTesting($input: DeleteTestingInput!) {
  deleteTesting(input: $input) {
    name
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    name
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    name
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    name
  }
}
`;
