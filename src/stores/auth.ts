import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  role_id: number;
  token: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!JwtService.getToken());

  function setAuth(authUser: User) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
    JwtService.saveToken(user.value.token);
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = [];
    JwtService.destroyToken();
  }

  function login(credentials: User) {
    return ApiService.post("user/login", credentials)
      .then((response: any) => {
        setAuth(response);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...response,
          })
        );
        localStorage.setItem("id_token", response.token);
      })
      .catch(({ response }) => {
        setError(response.data.msg);
      });
  }

  function logout() {
    purgeAuth();
    localStorage.removeItem("userData");
    localStorage.removeItem("id_token");
  }

  function register(credentials: User) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function forgotPassword(email: string) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function verifyAuth() {
    if (JwtService.getToken()) {
    } else {
    }
    // const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    // if (JwtService.getToken()) {
    //   ApiService.setHeader();
    //   ApiService.post("verify_token", { api_token: JwtService.getToken() })
    //     .then(({ data }) => {
    //       setAuth(data);
    //     })
    //     .catch(({ response }) => {
    //       setError(response.data.errors);
    //       purgeAuth();
    //     });
    // } else {
    //   purgeAuth();
    // }
  }

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
  };
});
