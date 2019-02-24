// tslint:disable
// this is an auto generated file. This will be overwritten

export const createNoticePost = `mutation CreateNoticePost($input: CreateNoticePostInput!) {
  createNoticePost(input: $input) {
    id
    body
    comments {
      id
      body
      date
      postId
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
    }
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
    date
    headerImgSrc
    isLike
    issueName
    numComments
    numLikes
    numShares
    themeColor
    title
    topics
    whoLike {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
  }
}
`;
export const updateNoticePost = `mutation UpdateNoticePost($input: UpdateNoticePostInput!) {
  updateNoticePost(input: $input) {
    id
    body
    comments {
      id
      body
      date
      postId
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
    }
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
    date
    headerImgSrc
    isLike
    issueName
    numComments
    numLikes
    numShares
    themeColor
    title
    topics
    whoLike {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
  }
}
`;
export const deleteNoticePost = `mutation DeleteNoticePost($input: DeleteNoticePostInput!) {
  deleteNoticePost(input: $input) {
    id
    body
    comments {
      id
      body
      date
      postId
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
    }
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
    date
    headerImgSrc
    isLike
    issueName
    numComments
    numLikes
    numShares
    themeColor
    title
    topics
    whoLike {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
  }
}
`;
export const createFreePost = `mutation CreateFreePost($input: CreateFreePostInput!) {
  createFreePost(input: $input) {
    id
    body
    comments {
      id
      body
      date
      postId
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
    }
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
    date
    headerImgSrc
    isLike
    issueName
    numComments
    numLikes
    numShares
    themeColor
    title
    topics
    whoLike {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
  }
}
`;
export const updateFreePost = `mutation UpdateFreePost($input: UpdateFreePostInput!) {
  updateFreePost(input: $input) {
    id
    body
    comments {
      id
      body
      date
      postId
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
    }
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
    date
    headerImgSrc
    isLike
    issueName
    numComments
    numLikes
    numShares
    themeColor
    title
    topics
    whoLike {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
  }
}
`;
export const deleteFreePost = `mutation DeleteFreePost($input: DeleteFreePostInput!) {
  deleteFreePost(input: $input) {
    id
    body
    comments {
      id
      body
      date
      postId
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
    }
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
    date
    headerImgSrc
    isLike
    issueName
    numComments
    numLikes
    numShares
    themeColor
    title
    topics
    whoLike {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
  }
}
`;
export const createProjectPost = `mutation CreateProjectPost($input: CreateProjectPostInput!) {
  createProjectPost(input: $input) {
    id
    body
    comments {
      id
      body
      date
      postId
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
    }
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
    date
    headerImgSrc
    isLike
    issueName
    numComments
    numLikes
    numShares
    themeColor
    title
    topics
    whoLike {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
    contributors {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
      position
    }
  }
}
`;
export const updateProjectPost = `mutation UpdateProjectPost($input: UpdateProjectPostInput!) {
  updateProjectPost(input: $input) {
    id
    body
    comments {
      id
      body
      date
      postId
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
    }
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
    date
    headerImgSrc
    isLike
    issueName
    numComments
    numLikes
    numShares
    themeColor
    title
    topics
    whoLike {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
    contributors {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
      position
    }
  }
}
`;
export const deleteProjectPost = `mutation DeleteProjectPost($input: DeleteProjectPostInput!) {
  deleteProjectPost(input: $input) {
    id
    body
    comments {
      id
      body
      date
      postId
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
    }
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
    date
    headerImgSrc
    isLike
    issueName
    numComments
    numLikes
    numShares
    themeColor
    title
    topics
    whoLike {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
    contributors {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
      position
    }
  }
}
`;
export const createComment = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    id
    body
    date
    postId
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
  }
}
`;
export const updateComment = `mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    id
    body
    date
    postId
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
  }
}
`;
export const deleteComment = `mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    id
    body
    date
    postId
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
  }
}
`;
export const createProjectComment = `mutation CreateProjectComment($input: CreateProjectCommentInput!) {
  createProjectComment(input: $input) {
    id
    body
    date
    postId
    projectId
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
      position
    }
  }
}
`;
export const updateProjectComment = `mutation UpdateProjectComment($input: UpdateProjectCommentInput!) {
  updateProjectComment(input: $input) {
    id
    body
    date
    postId
    projectId
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
      position
    }
  }
}
`;
export const deleteProjectComment = `mutation DeleteProjectComment($input: DeleteProjectCommentInput!) {
  deleteProjectComment(input: $input) {
    id
    body
    date
    postId
    projectId
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
      position
    }
  }
}
`;
export const createProject = `mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    proposer {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
      position
    }
    name
    description
    types
    topics
    deadlineOption
    startDuration
    endDuration
    manager
    personnel
    hasPlace
    place
    studyTopics
    studyMeeting
    studyTutor
    contestTopic
    contestProductDescription
    contestName
    contestDuedate
    contestObjectives
    seminarTopics
    seminarIsOnce
    seminarMeeting
    seminarPresenter
    shareCopyright
    agileHasBeen
    etcDescription
    request {
      id
      projectId
      date
      requester {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
        position
      }
      hopePlaces
      material
      budget
      cookie
      extra
      status
    }
    activities {
      id
      projectName
      date
      type
      description
      contributors {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
        position
      }
    }
    contributors {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
      position
    }
    comments {
      id
      body
      date
      postId
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
    }
    contents {
      id
      body
      comments {
        id
        body
        date
        postId
      }
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
      date
      headerImgSrc
      isLike
      issueName
      numComments
      numLikes
      numShares
      themeColor
      title
      topics
      whoLike {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
      contributors {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
        position
      }
    }
    fixedBudget
    pictures {
      body
      date
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
        position
      }
      src
      title
      comments {
        id
        body
        date
        postId
      }
      numComments
      numLikes
      numShares
      topics
    }
    supports {
      id
      projectId
      date
      status
      title
      description
    }
    status
    syncGithub
    themeColor
  }
}
`;
export const updateProject = `mutation UpdateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
    id
    proposer {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
      position
    }
    name
    description
    types
    topics
    deadlineOption
    startDuration
    endDuration
    manager
    personnel
    hasPlace
    place
    studyTopics
    studyMeeting
    studyTutor
    contestTopic
    contestProductDescription
    contestName
    contestDuedate
    contestObjectives
    seminarTopics
    seminarIsOnce
    seminarMeeting
    seminarPresenter
    shareCopyright
    agileHasBeen
    etcDescription
    request {
      id
      projectId
      date
      requester {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
        position
      }
      hopePlaces
      material
      budget
      cookie
      extra
      status
    }
    activities {
      id
      projectName
      date
      type
      description
      contributors {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
        position
      }
    }
    contributors {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
      position
    }
    comments {
      id
      body
      date
      postId
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
    }
    contents {
      id
      body
      comments {
        id
        body
        date
        postId
      }
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
      date
      headerImgSrc
      isLike
      issueName
      numComments
      numLikes
      numShares
      themeColor
      title
      topics
      whoLike {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
      contributors {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
        position
      }
    }
    fixedBudget
    pictures {
      body
      date
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
        position
      }
      src
      title
      comments {
        id
        body
        date
        postId
      }
      numComments
      numLikes
      numShares
      topics
    }
    supports {
      id
      projectId
      date
      status
      title
      description
    }
    status
    syncGithub
    themeColor
  }
}
`;
export const deleteProject = `mutation DeleteProject($input: DeleteProjectInput!) {
  deleteProject(input: $input) {
    id
    proposer {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
      position
    }
    name
    description
    types
    topics
    deadlineOption
    startDuration
    endDuration
    manager
    personnel
    hasPlace
    place
    studyTopics
    studyMeeting
    studyTutor
    contestTopic
    contestProductDescription
    contestName
    contestDuedate
    contestObjectives
    seminarTopics
    seminarIsOnce
    seminarMeeting
    seminarPresenter
    shareCopyright
    agileHasBeen
    etcDescription
    request {
      id
      projectId
      date
      requester {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
        position
      }
      hopePlaces
      material
      budget
      cookie
      extra
      status
    }
    activities {
      id
      projectName
      date
      type
      description
      contributors {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
        position
      }
    }
    contributors {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
      position
    }
    comments {
      id
      body
      date
      postId
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
    }
    contents {
      id
      body
      comments {
        id
        body
        date
        postId
      }
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
      date
      headerImgSrc
      isLike
      issueName
      numComments
      numLikes
      numShares
      themeColor
      title
      topics
      whoLike {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
      contributors {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
        position
      }
    }
    fixedBudget
    pictures {
      body
      date
      author {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
        position
      }
      src
      title
      comments {
        id
        body
        date
        postId
      }
      numComments
      numLikes
      numShares
      topics
    }
    supports {
      id
      projectId
      date
      status
      title
      description
    }
    status
    syncGithub
    themeColor
  }
}
`;
export const createRequest = `mutation CreateRequest($input: CreateRequestInput!) {
  createRequest(input: $input) {
    id
    projectId
    date
    requester {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
      position
    }
    hopePlaces
    material
    budget
    cookie
    extra
    status
  }
}
`;
export const updateRequest = `mutation UpdateRequest($input: UpdateRequestInput!) {
  updateRequest(input: $input) {
    id
    projectId
    date
    requester {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
      position
    }
    hopePlaces
    material
    budget
    cookie
    extra
    status
  }
}
`;
export const deleteRequest = `mutation DeleteRequest($input: DeleteRequestInput!) {
  deleteRequest(input: $input) {
    id
    projectId
    date
    requester {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
      position
    }
    hopePlaces
    material
    budget
    cookie
    extra
    status
  }
}
`;
export const createHistory = `mutation CreateHistory($input: CreateHistoryInput!) {
  createHistory(input: $input) {
    id
    date
    body
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
  }
}
`;
export const updateHistory = `mutation UpdateHistory($input: UpdateHistoryInput!) {
  updateHistory(input: $input) {
    id
    date
    body
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
  }
}
`;
export const deleteHistory = `mutation DeleteHistory($input: DeleteHistoryInput!) {
  deleteHistory(input: $input) {
    id
    date
    body
    author {
      birthdate
      snsLogin
      email
      email_verified
      name
      phone_number
      posts
      avatar
      level
    }
  }
}
`;
export const createTesting = `mutation CreateTesting($input: CreateTestingInput!) {
  createTesting(input: $input) {
    id
    name
  }
}
`;
export const updateTesting = `mutation UpdateTesting($input: UpdateTestingInput!) {
  updateTesting(input: $input) {
    id
    name
  }
}
`;
export const deleteTesting = `mutation DeleteTesting($input: DeleteTestingInput!) {
  deleteTesting(input: $input) {
    id
    name
  }
}
`;
