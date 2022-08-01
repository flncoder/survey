import Vue from 'vue'
import Router from 'vue-router'
import UserInfo from '@/components/UserInfo'
import Commitment from '@/components/Commitment'
import Introduction from '@/components/Introduction'
import First from '@/components/First'
import Second from '@/components/Second'
import SecondPlay from '@/components/SecondPlay'
import Third from '@/components/Third'
import ThirdPlay from '@/components/ThirdPlay'
import Fourth from '@/components/Fourth'
import FourthPlay from '@/components/FourthPlay'
import Fifth from '@/components/Fifth'
import FifthPlay from '@/components/FifthPlay'
import Sixth from '@/components/Sixth'
import SixthPlay from '@/components/SixthPlay'
import Seventh from '@/components/Seventh'
import SeventhPlay from '@/components/SeventhPlay'
import ResultPage from '@/components/ResultPage'
import QuizResults from '@/components/QuizResults'
import ManagePage from '@/components/ManagePage'
import Welcome from '@/components/Welcome'
import Overview from '@/components/Overview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/commitment',
      name: 'Commitment',
      component: Commitment
    },
    {
      path: '/userinfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/introduction',
      name: 'Introduction',
      component: Introduction
    },
    {
      path: '/first',
      name: 'First',
      component: First
    },
    {
      path: '/second',
      name: 'Second',
      component: Second
    },
    {
      path: '/secondplay',
      name: 'SecondPlay',
      component: SecondPlay
    },
    {
      path: '/third',
      name: 'Third',
      component: Third
    },
    {
      path: '/thirdplay',
      name: 'ThirdPlay',
      component: ThirdPlay
    },
    {
      path: '/fourth',
      name: 'Fourth',
      component: Fourth
    },
    {
      path: '/fourthplay',
      name: 'FourthPlay',
      component: FourthPlay
    },
    {
      path: '/fifth',
      name: 'Fifth',
      component: Fifth
    },
    {
      path: '/fifthplay',
      name: 'FifthPlay',
      component: FifthPlay
    },
    {
      path: '/sixth',
      name: 'Sixth',
      component: Sixth
    },
    {
      path: '/sixthplay',
      name: 'SixthPlay',
      component: SixthPlay
    },
    {
      path: '/seventh',
      name: 'Seventh',
      component: Seventh
    },
    {
      path: '/seventhplay',
      name: 'SeventhPlay',
      component: SeventhPlay
    },
    {
      path: '/resultpage',
      name: 'ResultPage',
      component: ResultPage
    },
    {
      path: '/quizresults',
      name: 'QuizResults',
      component: QuizResults
    },
    {
      path: '/managepage',
      name: 'ManagePage',
      component: ManagePage
    },
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/overview',
      name: 'Overview',
      component: Overview
    }
  ]
})
