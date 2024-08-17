import Router from "next/router";
import { IsQueryParamsEncryption, SGTechWebUrl } from "../utils/AppSetting";

import { encryptAES, decryptAES, decryptionAPI } from "../utils/Encryption";
import Cart from "../pages/cart/Cart";
//application routes
export const Routes = {
  dashboard: {
    rawPath: "/home/Home",
    urlPath: "/home",
    isQueryParams: true,
    isEncryptParams: false,
  },

  signIn: {
    rawPath: "/signIn/SignIn",
    urlPath: "/signIn",
    isQueryParams: true,
    isEncryptParams: false,
  },

  contact: {
    rawPath: "/contact/Contact",
    urlPath: "/contact",
    isQueryParams: true,
    isEncryptParams: false,
  },

  signUp: {
    rawPath: "/signUp/SignUp",
    urlPath: "/signUp",
    isQueryParams: true,
    isEncryptParams: false,
  },

  taskList: {
    rawPath: "/taskList/TaskList",
    urlPath: "/taskList",
    isQueryParams: true,
    isEncryptParams: false,
  },

  forgotPassword: {
    rawPath: "/forgotPassword/ForgotPassword",
    urlPath: "/forgotPassword",
    isQueryParams: true,
    isEncryptParams: false,
  },

  profile: {
    rawPath: "/profile/Profile",
    urlPath: "/profile",
    isQueryParams: true,
    isEncryptParams: false,
  },

  product: {
    rawPath: "/product/Product",
    urlPath: "/product",
    isQueryParams: true,
    isEncryptParams: false,
  },

  productDetail: {
    rawPath: "/productDetail/ProductDetail",
    urlPath: "/productDetail",
    isQueryParams: true,
    isEncryptParams: false,
  },

  Cart: {
    rawPath: "/cart/Cart",
    urlPath: "/cart",
    isQueryParams: true,
    isEncryptParams: false,
  },

  Payment: {
    rawPath: "/payment/Payment",
    urlPath: "/payment",
    isQueryParams: true,
    isEncryptParams: false,
  }
};

//Common navigation method
export const Navigate = (routePath, params = []) => {
  if (routePath) {
    if (params.length > 0) {
      let queryParams = "";
      if (IsQueryParamsEncryption && routePath.isEncryptParams) {
        params.forEach((element) => {
          queryParams = queryParams + "/" + encryptAES(element, 0);
        });
      } else {
        params.forEach((element) => {
          (queryParams = queryParams + "/" + element), 0;
        });
      }
      Router.push(routePath.rawPath, routePath.urlPath + queryParams);
    } else {
      Router.push(routePath.rawPath, routePath.urlPath);
    }
  } else {
    //TODO: Redirect to page not found
  }
};

//Common navigation method :https://namespaceit.com/blog/how-to-use-routerpush-with-state-in-nextjs
export const NavigateWithData = (routePath, data, params = []) => {
  if (routePath) {
    if (params.length > 0) {
      let queryParams = "";
      if (IsQueryParamsEncryption && routePath.isEncryptParams) {
        params.forEach((element) => {
          queryParams = queryParams + "/" + encryptAES(element, 0);
        });
      } else {
        params.forEach((element) => {
          (queryParams = queryParams + "/" + element), 0;
        });
      }
      if (data) {
        // let q="";
        // q=encryptionData(data);
        // Router.push({
        //   pathname: routePath.urlPath,
        //   query: q
        // });
        // let str = JSON.stringify(data);
        // data = encryptAES(str, 0);

        if (data) {
          Object.keys(data).forEach((key) => {
            data[key] = encryptAES(data[key], false);
          });
        }
        Router.push({
          pathname: routePath.urlPath + queryParams,
          query: data,
        });
      } else {
        Router.push(routePath.rawPath, routePath.urlPath + queryParams);
      }
    } else {
      if (data) {
        // let q="";
        // q=encryptionData(data);
        // Router.push({
        //   pathname: routePath.urlPath,
        //   query: q
        // });
        Object.keys(data).forEach((key) => {
          data[key] = encryptAES(data[key], false);
        });
        Router.push({
          pathname: routePath.urlPath,
          query: data,
        });
      } else {
        Router.push(routePath.rawPath, routePath.urlPath);
      }
    }
  } else {
    //TODO: Redirect to page not found
  }
};

//Common navigation method
export const NavigateBack = () => {
  Router.back();
};

export const GetRouteParams = (
  isEncryptedParams = false,
  isAPIEncrypted = false
) => {
  if (isEncryptedParams && IsQueryParamsEncryption) {
    let params = { ...Router.query };

    if (params) {
      if (!params.isRenewal && isAPIEncrypted === true) {
        Object.keys(params).forEach((key) => {
          let req = {
            isEnType: true,
            responseData: atob(params[key]),
            responseType: 1,
          };
          params[key] = decryptionAPI(req);
        });
      } else {
        Object.keys(params).forEach((key) => {
          params[key] = decryptAES(params[key], false);
        });
      }
    }
    return params;
  } else {
    return Router.query;
  }
};

export const NavigateToSGTechSite = (routePath, params = []) => {
  if (routePath) {
    if (params.length > 0) {
      let queryParams = "";
      if (IsQueryParamsEncryption && routePath.isEncryptParams) {
        params.forEach((element) => {
          queryParams = queryParams + "/" + encryptAES(element, 0);
        });
      } else {
        params.forEach((element) => {
          (queryParams = queryParams + "/" + element), 0;
        });
      }
      window.location.href = SGTechWebUrl + routePath.urlPath + queryParams;
      //Router.push(routePath.rawPath, routePath.urlPath + queryParams);
    } else {
      window.location.href = SGTechWebUrl + routePath.urlPath;
      //Router.push(routePath.rawPath, routePath.urlPath);
    }
  } else {
    //TODO: Redirect to page not found
  }
};
