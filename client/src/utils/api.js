import axios from "./axios";
import errorHandler from "./errorHandler";
import notify from "./notification";

// authentication api's
export const login = errorHandler((data) => axios.post(`/auth/login`, data))

export const signUp = async (data, dispatch) => {
  try {
    const res = await axios.post(`/auth/signup`, data);
    if (res.data) {
      dispatch({
        type: "user_login",
        payload: res.data,
      });
      return true;
    }
    return false;
  } catch (error) {
    const errorMessage = error?.response?.data?.message || error.message
    console.error('Error ' + errorMessage)
    notify({ message: errorMessage, title: 'Error !', type: 'danger' })
    return
  }
};

export const sendOtp = errorHandler((data) => axios.post(`/auth/sendOtp`, data))

export const signOut = errorHandler((dispatch) => {
  dispatch({
    type: "user_logout",
    payload: "",
  });
  return axios.post(`/auth/logout`);
})


// Tutor Api's

export const createCourse = errorHandler((data) => axios.post(`/tutor/createCourse`, data))

export const editCourse = errorHandler((data) => axios.post(`/tutor/editCourse`, data))

export const fetchCourses = errorHandler((id) => axios.get(`/tutor/fetchCourses?id=${id}`))

export const courseDetails = errorHandler((id) => axios.get(`/tutor/courseDetails?id=${id}`))

export const sendNotification = errorHandler((id) => axios.get(`/notification/send-notification?id=${id}`))

export const updateProfile = errorHandler((data) => axios.post(`/tutor/updateProfile`, data))


// User Api's

export const getCourses = errorHandler((data) => axios.post(`/user/getCourses`,data))

export const subscribe = errorHandler((data) => axios.post(`/user/subscribe`, data))

export const bookmark = errorHandler((data) => axios.post(`/user/bookmark`, data))

// Admin Api's

export const getUsers = errorHandler(({type,search})=>axios.get(`/admin/users/${type}?search=${search}`))

export const getCourse = errorHandler((search)=>axios.get(`/admin/courses?search=${search}`))

export const blockUser = errorHandler((id)=>axios.get(`/admin/blockuser/${id}`))