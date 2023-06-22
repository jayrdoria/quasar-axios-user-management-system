const routes = [
    {
      path: "/",
      component: () => import("layouts/MainLayout.vue"),
      children: [
        { path: "", component: () => import("src/pages/UserInfo.vue") },
      ],
    },
    {
      path: "/",
      component: () => import("layouts/MainLayout.vue"),
      children: [
        {
          path: "user-info",
          name: "user-info",
          component: () => import("pages/UserInfo.vue"),
        },
        {
          path: "list-user",
          name: "list-user",
          component: () => import("pages/ListOfUsers.vue"),
        },
      ],
    },
  
    // Always leave this as last one,
    // but you can also remove it
    {
      path: "/:catchAll(.*)*",
      component: () => import("pages/ErrorNotFound.vue"),
    },
  ];
  
  export default routes;

