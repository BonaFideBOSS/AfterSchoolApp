import { createRouter, createWebHistory } from "vue-router";
import Lessons from "@/views/Lessons.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "lessons",
      component: Lessons,
      meta: { title: "Home" },
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/Cart.vue"),
      meta: { title: "My Cart" },
    },
    {
      path: "/myorders",
      name: "myorders",
      component: () => import("@/views/MyOrders.vue"),
      meta: { title: "My Orders" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  var title = to.meta.title ? ` - ${to.meta.title}` : "";
  document.title = `AfterSchool${title}` || "AfterSchool";
  next();
});

export default router;
