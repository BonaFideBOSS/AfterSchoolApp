import { createRouter, createWebHistory } from "vue-router";
import Lessons from "@/views/Lessons.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "lessons",
      component: Lessons,
      title: "Home",
      titleShort: "Home",
      icon: "fa-duotone fa-house",
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/Cart.vue"),
      title: "My Cart",
      titleShort: "Cart",
      icon: "fa-duotone fa-cart-shopping",
    },
    {
      path: "/myorders",
      name: "myorders",
      component: () => import("@/views/MyOrders.vue"),
      title: "My Orders",
      titleShort: "Orders",
      icon: "fa-duotone fa-clock-rotate-left",
    },
  ],
});

router.beforeEach((to, from, next) => {
  var title = to.title ? ` - ${to.title}` : "";
  document.title = `AfterSchool${title}` || "AfterSchool";
  next();
});

export default router;
