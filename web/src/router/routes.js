import Projects from 'pages/Projects.vue'
import Plans from 'pages/Plans.vue'
import Login from 'pages/Login.vue'

import Dashboard from 'pages/admin/Dashboard.vue'
import Members from 'pages/admin/Members.vue'
import Files from 'pages/admin/Files.vue'

const routes = [
  {
    path: '',
    component: () => import('layouts/Intro.vue'),
    children: [
      {
        path: '',
        darken: true,
        component: () => import('pages/Intro.vue')
      },
      {
        path: 'projects',
        name: '프로젝트',
        component: () => import('layouts/Project.vue'),
        children: [
          {
            path: '/',
            icon: 'home',
            component: Projects
          },
          {
            path: 'new',
            name: '새로만들기',
            component: () => import('pages/ProjectNew.vue')
          },
          {
            path: 'detail',
            name: '상세정보',
            component: () => import('pages/ProjectDetail.vue')
          },
          {
            path: 'sample',
            name: '예시',
            component: () => import('pages/ProjectSample.vue')
          }
        ]
      },
      {
        path: 'plans',
        name: '연간계획',
        component: Plans
      },
      {
        path: 'apply',
        name: '신입지원',
        component: () => import('pages/Apply.vue')
      },
      {
        path: 'register',
        name: '기존회원등록',
        component: () => import('pages/Register.vue')
      },
      {
        path: 'login',
        name: '로그인',
        component: Login
      },
      {
        path: 'confirm_email',
        name: '이메일 인증',
        component: () => import('pages/ConfirmEmail.vue')
      },
      {
        path: 'board',
        name: '자유게시판',
        component: () => import('pages/Board.vue')
      },
      {
        path: 'notice',
        name: '공지사항',
        component: () => import('pages/Notice.vue')
      },
      {
        path: 'profile',
        name: '프로필',
        component: () => import('pages/Profile.vue')
      },
      {
        path: 'report',
        name: '오류신고',
        component: () => import('pages/Report.vue')
      },
      {
        path: 'admin',
        component: () => import('layouts/Admin.vue'),
        children: [
          {
            path: '',
            component: Dashboard
          },
          {
            path: 'members',
            component: Members
          },
          {
            path: 'projects',
            component: () => import('pages/admin/Projects.vue')
          },
          {
            path: 'files',
            component: Files
          }
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
