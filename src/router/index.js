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
      titleShort: "Home",
      icon: "fa-duotone fa-house",
      show: true,
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/Cart.vue"),
      meta: { title: "My Cart" },
      titleShort: "Cart",
      icon: "fa-duotone fa-cart-shopping",
      show: true,
    },
    {
      path: "/myorders",
      name: "myorders",
      component: () => import("@/views/MyOrders.vue"),
      meta: { title: "My Orders" },
      titleShort: "Orders",
      icon: "fa-duotone fa-clock-rotate-left",
      show: true,
    },
    {
      path: "/:catchAll(.*)",
      name: "error",
      component: () => import("@/views/NotFound.vue"),
      meta: { title: "Page Not Found" },
      titleShort: "404",
      icon: "fa-duotone fa-clock-rotate-left",
      show: false,
    },
  ],
});

router.beforeEach((to, from, next) => {
  var title = to.meta.title ? ` - ${to.meta.title}` : "";
  document.title = `AfterSchool${title}` || "AfterSchool";
  next();
});

export default router;
