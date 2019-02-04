// tslint:disable
// this is an auto generated file. This will be overwritten

export const getNoticePost = `query GetNoticePost($id: ID!) {
  getNoticePost(id: $id) {
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
export const listNoticePosts = `query ListNoticePosts(
  $filter: ModelNoticePostFilterInput
  $limit: Int
  $nextToken: String
) {
  listNoticePosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    }
    nextToken
  }
}
`;
export const getFreePost = `query GetFreePost($id: ID!) {
  getFreePost(id: $id) {
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
export const listFreePosts = `query ListFreePosts(
  $filter: ModelFreePostFilterInput
  $limit: Int
  $nextToken: String
) {
  listFreePosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    }
    nextToken
  }
}
`;
export const getProjectPost = `query GetProjectPost($id: ID!) {
  getProjectPost(id: $id) {
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
export const listProjectPosts = `query ListProjectPosts(
  $filter: ModelProjectPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listProjectPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getComment = `query GetComment($id: ID!) {
  getComment(id: $id) {
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
export const listComments = `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getProjectComment = `query GetProjectComment($id: ID!) {
  getProjectComment(id: $id) {
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
export const listProjectComments = `query ListProjectComments(
  $filter: ModelProjectCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listProjectComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
        avatar
        level
        position
      }
    }
    nextToken
  }
}
`;
export const getProject = `query GetProject($id: ID!) {
  getProject(id: $id) {
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
    }
    name
    description
    types
    topics
    deadlineOption
    startDutaion
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
export const listProjects = `query ListProjects(
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      proposer {
        birthdate
        snsLogin
        email
        email_verified
        name
        phone_number
        avatar
        level
      }
      name
      description
      types
      topics
      deadlineOption
      startDutaion
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
      comments {
        id
        body
        date
        postId
      }
      contents {
        id
        body
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
      }
      fixedBudget
      pictures {
        body
        date
        src
        title
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
    nextToken
  }
}
`;
export const getRequest = `query GetRequest($id: ID!) {
  getRequest(id: $id) {
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
export const listRequests = `query ListRequests(
  $filter: ModelRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  listRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getHistory = `query GetHistory($id: ID!) {
  getHistory(id: $id) {
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
export const listHistorys = `query ListHistorys(
  $filter: ModelHistoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listHistorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
        avatar
        level
      }
    }
    nextToken
  }
}
`;
export const getTesting = `query GetTesting($id: ID!) {
  getTesting(id: $id) {
    id
    name
  }
}
`;
export const listTestings = `query ListTestings(
  $filter: ModelTestingFilterInput
  $limit: Int
  $nextToken: String
) {
  listTestings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
    }
    nextToken
  }
}
`;
