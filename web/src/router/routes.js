import Project from 'layouts/Project.vue'

import Projects from 'pages/Projects.vue'
import Plans from 'pages/Plans.vue'
import Board from 'pages/Board.vue'
import Notice from 'pages/Notice.vue'
import Profile from 'pages/Profile.vue'
import Report from 'pages/Report.vue'

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
        component: () => import('pages/Intro.vue')
      },
      {
        path: 'projects',
        component: Project,
        children: [
          {
            path: '/',
            component: Projects
          },
          {
            path: 'new',
            component: () => import('pages/ProjectNew.vue')
          },
          {
            path: 'detail',
            component: () => import('pages/ProjectDetail.vue')
          },
          {
            path: 'sample',
            component: () => import('pages/ProjectSample.vue')
          }
        ]
      },
      {
        path: 'plans',
        component: Plans
      },
      {
        path: 'apply',
        component: () => import('pages/Apply.vue')
      },
      {
        path: 'register',
        component: () => import('pages/Register.vue')
      },
      {
        path: 'board',
        component: Board
      },
      {
        path: 'notice',
        component: Notice
      },
      {
        path: 'profile',
        component: Profile
      },
      {
        path: 'report',
        component: Report
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
