import axios from "axios";

export const userLogin = (credentials, userType) => {
  return async (dispatch) => {
    try {
      let endpoint;

      if (userType === "employer") {
        endpoint = "http://localhost:8080/api/employer/login";
      } else if (userType === "isarayan") {
        endpoint = "http://localhost:8080/api/isarayan/login";
      } else {
        // Hatalı kullanıcı tipi durumunda ilgili işlemleri yapabilirsiniz
        console.error("Geçersiz kullanıcı tipi");
        return;
      }

      const response = await axios.post(endpoint, credentials);
      const user = response.data; // Giriş yapan kullanıcıyı alın

      dispatch({
        type: "auth/userLogin",
        payload: user,
      });
    } catch (error) {
      // Hata durumunda ilgili işlemleri yapabilirsiniz
      console.error("Giriş yaparken bir hata oluştu:", error);
    }
  };
};
