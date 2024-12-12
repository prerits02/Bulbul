import { endpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setUser, setToken,setLoading } from "../../slices/userSlice";
import toast from "react-hot-toast";


export function login(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    try {
    
      console.log("Login request data:", data);
      
      const response = await apiConnector(
        "POST",
        endpoints.login,
        data,
        null,
        null
      );
      
      console.log("LOGIN RESPONSE : ", response);
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      toast.success("Successfully Logged in");
      navigate("/books");
    } catch (err) {
      console.log("Login error details:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Error logging in");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export const signUp = (data, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiConnector(
      "POST",
      endpoints.signup,
      data
    );

    console.log("SIGNUP API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    dispatch(setToken(response.data.token));
    dispatch(setUser(response.data.user));
    
  
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("user", JSON.stringify(response.data.user));

    navigate("/books");

  } catch (error) {
    console.log("SIGNUP API ERROR: ", error);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};
