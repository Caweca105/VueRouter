import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import sourceData from "@/data.json";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/protected",
    name: "protected",
    components: {
      default: () => import("@/views/ProtectedShow.vue"),
      LeftSidebar: () => import("@/components/LeftSidebar.vue"),
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/invoices",
    name: "invoices",
    components: {
      default: () => import("@/views/InvoicesShow.vue"),
      LeftSidebar: () => import("@/components/LeftSidebar.vue"),
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginShow.vue"),
  },
  {
    path: "/example/:id",
    component: () => import("@/views/LoginShow.vue"),
  },
  {
    path: "/destination/:id/:slug",
    name: "destination.show",
    component: () => import("@/views/DestinationShow.vue"),
    props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
    beforeEnter: (to) => {
      const exists = sourceData.destinations.find(
        (destination) => destination.id === parseInt(to.params.id)
      );
      if (!exists)
        return {
          name: "NotFound",
          // allows keeping URL while rendering a different page
          params: { pathMatch: to.path.split("/").slice(1) },
          query: to.query,
          hash: to.hash,
        };
    },
    children: [
      {
        path: ":experienceSlug",
        name: "experience.show",
        component: () => import("@/views/ExperienceShowcase.vue"),
        props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0 }), 300);
      })
    );
  },
});
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !window.user) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
});

export default router;
