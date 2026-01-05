import { createRouter, createWebHistory } from 'vue-router';
import { isUserLoggedIn } from '@/utils/requestError';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/login.vue'),
      meta: {
        title: 'Login',
        layout: 'public',
      },
    },

    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/auth/forgot-password.vue'),
      meta: {
        title: 'Forgot Password',
        layout: 'public',
      },
    },

    {
      path: '/forgot-password/email-verification',
      name: 'email-verification',
      component: () => import('../views/auth/email-verification.vue'),
      meta: {
        title: 'Verify Email',
        layout: 'public',
      },
    },

    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('../views/auth/reset-password.vue'),
      meta: {
        title: 'Reset Password',
        layout: 'public',
      },
    },

    {
      path: '/reset-success',
      name: 'reset-success',
      component: () => import('../views/auth/reset-success.vue'),
      meta: {
        title: 'Reset Password',
        layout: 'public',
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard/index.vue'),
      meta: {
        title: 'Login',
        layout: 'private',
        requiresAuth: true,
      },
    },

    {
      path: '/applications',
      name: 'applications',
      component: () => import('../views/applications/index.vue'),
      meta: {
        title: 'Applications',
        layout: 'private',
        requiresAuth: true,
      },
    },

    {
      path: '/users',
      name: 'users',
      component: () => import('../views/users/index.vue'),
      meta: {
        title: 'Applications',
        layout: 'private',
        requiresAuth: true,
      },
    },

    {
      path: '/users/:id/details',
      name: 'user-details',
      component: () => import('../views/users/details.vue'),
      meta: {
        title: 'Applications',
        layout: 'private',
        requiresAuth: true,
      },
    },

    {
      path: '/application/:id/details',
      name: 'application-details',
      component: () => import('../views/users/application-details.vue'),
      meta: {
        title: 'Applications',
        layout: 'private',
        requiresAuth: true,
      },
    },

    {
      path: '/application/:id/edit',
      name: 'application-edit',
      component: () =>
        import('../views/users/components/EditApplicationForm.vue'),
      meta: {
        title: 'Applications',
        layout: 'private',
        requiresAuth: true,
      },
    },

    {
      path: '/application/:id/create',
      name: 'application-create',
      component: () =>
        import('../views/users/components/CreateApplicationForm.vue'),
      meta: {
        title: 'Applications',
        layout: 'private',
        requiresAuth: true,
      },
    },

    {
      path: '/subscriptions',
      name: 'subscriptions',
      component: () => import('../views/subscriptions/index.vue'),
      meta: {
        title: 'Subscriptions',
        layout: 'private',
        requiresAuth: true,
      },
    },

    {
      path: '/subscriptions/:id/details',
      name: 'subscriptions-details',
      component: () => import('../views/subscriptions/details.vue'),
      meta: {
        title: 'Subscriptions',
        layout: 'private',
        requiresAuth: true,
      },
    },

    {
      path: '/subscriptions/:id/applications',
      name: 'subscriptions-applications',
      component: () => import('../views/subscriptions/applications.vue'),
      meta: {
        title: 'Subscriptions',
        layout: 'private',
        requiresAuth: true,
      },
    },

    {
      path: '/payments',
      name: 'payments',
      component: () => import('../views/payments/index.vue'),
      meta: {
        title: 'Payments',
        layout: 'private',
        requiresAuth: true,
      },
    },
    {
      path: '/payments/:id/details',
      name: 'payment-details',
      component: () => import('../views/payments/details.vue'),
      meta: {
        title: 'Payments Details',
        layout: 'private',
        requiresAuth: true,
      },
    },
    {
      path: '/staffs',
      name: 'staffs',
      component: () => import('../views/staffs/index.vue'),
      meta: {
        title: 'Staffs',
        layout: 'private',
        requiresAuth: true,
      },
    },

    {
      path: '/staffs/create',
      name: 'staffs-create',
      component: () => import('../views/staffs/create.vue'),
      meta: {
        title: 'Create Staff',
        layout: 'private',
        requiresAuth: true,
      },
    },

    {
      path: '/promotions',
      name: 'promotions',
      component: () => import('../views/promotions/index.vue'),
      meta: {
        title: 'Coupon',
        layout: 'private',
        requiresAuth: true,
      },
    },
    {
      path: '/promotions/create',
      name: 'promotions-create',
      component: () => import('../views/promotions/create.vue'),
      meta: {
        title: 'Create a coupon code',
        layout: 'private',
        requiresAuth: true,
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings/index.vue'),
      meta: {
        title: 'Settings',
        layout: 'private',
        requiresAuth: true,
      },
    },

    {
      path: '/users/:id/create-job-profile',
      name: 'create-job-profile-1',
      component: () => import('../views/users/create-job-profile-1.vue'),
      meta: {
        title: 'Settings',
        layout: 'private',
        requiresAuth: true,
      },
    },

    {
      path: '/users/:id/create-job-profile-2',
      name: 'create-job-profile-2',
      component: () => import('../views/users/create-job-profile-2.vue'),
      meta: {
        title: 'Settings',
        layout: 'private',
        requiresAuth: true,
      },
    },
  ],
});

router.afterEach((to) => {
  document.title = `${to.meta.title} | Jobwise`;
});

// Route Guards before every navigation
router.beforeEach((to, _, next) => {
  const { requiresAuth } = to.meta;
  if (requiresAuth === true && !isUserLoggedIn()) {
    next(`/login`);
  } else if (requiresAuth === false && isUserLoggedIn()) {
    next({
      name: 'dashboard',
    });
  } else {
    next();
  }
});

export default router;
