/*!
 * Router (Vue)
 * File: router/index.js
 * Copyright(c) 2022 BC Gov
 * MIT Licensed
 */

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import NotFound from '@/views/404View.vue'
import Unauthorized from '@/views/401View.vue'
import NominationEmergingLeader from '@/../../../premiers-awards-admin/src/views/NominationEmergingLeader.vue'
import NominationEvidenceDesign from '@/../../../premiers-awards-admin/src/views/NominationEvidenceDesign.vue'
import NominationInnovation from '@/../../../premiers-awards-admin/src/views/NominationInnovation.vue'
import NominationLeadership from '@/../../../premiers-awards-admin/src/views/NominationLeadership.vue'
import NominationLegacy from '@/../../../premiers-awards-admin/src/views/NominationLegacy.vue'
import NominationOrgLeadership from '@/../../../premiers-awards-admin/src/views/NominationOrgExcellence.vue'
import NominationPartnership from '@/../../../premiers-awards-admin/src/views/NominationPartnership.vue'
import NominationRegionalImpact from '@/../../../premiers-awards-admin/src/views/NominationRegionalImpact.vue'
import ViewNomination from '@/../../../premiers-awards-admin/src/views/ViewNomination.vue'
import NominatorRegistration from '@/views/UsersRegisterView.vue'
import {getMeta} from "@/services/meta.services"
import {authorizeAdmin, authenticate} from "@/services/auth.services"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: getMeta('Nominations Home'),
    },
    {
      path: "/register",
      name: "registration",
      component: NominatorRegistration,
      meta: getMeta('Nominator Registration')
    },
    {
      path: "/view/:id",
      name: "nomination-view",
      component: ViewNomination,
      meta: getMeta('View Nomination'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/delete/:id",
      name: "nomination-delete",
      component: DeleteNomination,
      meta: getMeta('Delete Nomination'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/create/:year/emerging-leader",
      name: "emerging-leader",
      component: CreateNomination,
      meta: getMeta('Emerging Leader'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/create/:year/evidence-based-design",
      name: "evidence-based-design",
      component: CreateNomination,
      meta: getMeta('Evidence-Based Design'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/create/:year/leadership",
      name: "leadership",
      component: CreateNomination,
      meta: getMeta('Leadership'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/create/:year/legacy",
      name: "legacy",
      component: CreateNomination,
      meta: getMeta('Legacy'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/create/:year/innovation",
      name: "innovation",
      component: CreateNomination,
      meta: getMeta('Innovation'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/create/:year/organizational-excellence",
      name: "organizational-excellence",
      component: CreateNomination,
      meta: getMeta('Organizational Excellence'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/create/:year/partnership",
      name: "partnership",
      component: CreateNomination,
      meta: getMeta('Partnership'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/create/:year/regional-impact",
      name: "regional-impact",
      component: CreateNomination,
      meta: getMeta('Regional Impact'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/edit/:year/emerging-leader/:id",
      name: "emerging-leader-edit",
      component: NominationEmergingLeader,
      meta: getMeta('Emerging Leader'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/edit/:year/evidence-based-design/:id",
      name: "evidence-based-design-edit",
      component: NominationEvidenceDesign,
      meta: getMeta('Evidence-Based Design'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/edit/:year/leadership/:id",
      name: "leadership-edit",
      component: NominationLeadership,
      meta: getMeta('Leadership'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/edit/:year/legacy/:id",
      name: "legacy-edit",
      component: NominationLegacy,
      meta: getMeta('Legacy'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/edit/:year/innovation/:id",
      name: "innovation-edit",
      component: NominationInnovation,
      meta: getMeta('Innovation'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/edit/:year/organizational-excellence/:id",
      name: "organizational-excellence-edit",
      component: NominationOrgLeadership,
      meta: getMeta('Organizational Excellence'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/edit/:year/partnership/:id",
      name: "partnership-edit",
      component: NominationPartnership,
      meta: getMeta('Partnership'),
      beforeEnter: authorizeNominator
    },
    {
      path: "/edit/:year/regional-impact/:id",
      name: "regional-impact-edit",
      component: NominationRegionalImpact,
      meta: getMeta('Regional Impact'),
      beforeEnter: authorizeNominator
    },
    {
      path: '/401',
      name: 'unauthorized',
      component: Unauthorized,
      meta: getMeta('Unauthorized')
    },
    {
      path: '/:pathMatch(.*)*',
      name: "page-not-found",
      component: NotFound ,
      meta: getMeta('Page Not Found')
    }
  ]
})

// authenticate user on all routes
router.beforeEach(authenticate);

export default router
