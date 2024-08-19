module.exports = {
  trailingSlash: false,
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  async rewrites() {
    return [
      // Page Not Found
      { source: "/pageNotFound", destination: "/notFound/PageNotFound" },

      //SignIn & SignUp Page
      { source: "/signUp", destination: "/signUp/SignUp" },
      { source: "/signIn", destination: "/signIn/SignIn" },

      // Dashboard Page
      { source: "/home", destination: "/home/Home" },

      // Contact Page
      { source: '/contact', destination: '/contact/Contact' },

      // Tasklist Page
      { source: '/taskList', destination: '/taskList/TaskList' },

      // Forgot Password Page
      { source: '/forgotPassword', destination: '/forgotPassword/ForgotPassword' },
      { source: '/profile', destination: '/profile/Profile' },
      { source: '/product', destination: '/product/Product' },
      { source: '/productDetail', destination: '/productDetail/ProductDetail' },
      { source: '/cart', destination: '/cart/Cart' },
      { source: '/orders', destination: '/orders/Orders' },
      { source: '/payment', destination: '/payment/Payment' },
    ];
  },
};
