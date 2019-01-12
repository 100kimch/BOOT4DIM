// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateNotice = `subscription OnCreateNotice {
  onCreateNotice {
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
export const onUpdateNotice = `subscription OnUpdateNotice {
  onUpdateNotice {
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
export const onDeleteNotice = `subscription OnDeleteNotice {
  onDeleteNotice {
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
export const onCreateComment = `subscription OnCreateComment {
  onCreateComment {
    id
    body
  }
}
`;
export const onUpdateComment = `subscription OnUpdateComment {
  onUpdateComment {
    id
    body
  }
}
`;
export const onDeleteComment = `subscription OnDeleteComment {
  onDeleteComment {
    id
    body
  }
}
`;
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    label
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    label
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    label
  }
}
`;
