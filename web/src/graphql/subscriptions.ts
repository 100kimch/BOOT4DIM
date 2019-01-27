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
export const onUpdateNotice = `subscription OnUpdateNotice {
  onUpdateNotice {
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
export const onDeleteNotice = `subscription OnDeleteNotice {
  onDeleteNotice {
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
export const onCreateHistory = `subscription OnCreateHistory {
  onCreateHistory {
    id
    date
    body
  }
}
`;
export const onUpdateHistory = `subscription OnUpdateHistory {
  onUpdateHistory {
    id
    date
    body
  }
}
`;
export const onDeleteHistory = `subscription OnDeleteHistory {
  onDeleteHistory {
    id
    date
    body
  }
}
`;
export const onCreateTesting = `subscription OnCreateTesting {
  onCreateTesting {
    name
  }
}
`;
export const onUpdateTesting = `subscription OnUpdateTesting {
  onUpdateTesting {
    name
  }
}
`;
export const onDeleteTesting = `subscription OnDeleteTesting {
  onDeleteTesting {
    name
  }
}
`;
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    name
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    name
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    name
  }
}
`;
