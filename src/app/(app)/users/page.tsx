// import { cookies } from "next/headers";

// export const getData = async (endpoint) => {
//   const token = await verifyTokenExiste();
//   return axios({
//     method: endpoint.method ?? "GET",
//     url: API_BASE_URL + endpoint.endpoint,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     data: endpoint.data ?? {},
//   })
//     .then((res) => {
//       return successResponse(res);
//     })
//     .catch((err) => {
//       return errorResponse(err);
//     });
// };

// const successResponse = (res) => {
//   return {
//     status: res.status,
//     data: res.data,
//   };
// };

// const errorResponse = (err) => {
//   if (err.code === "ECONNREFUSED") {
//     return {
//       status: 503,
//       data: "",
//     };
//   }
//   if (err.status == 401) deleteUserSession(err.response);
//   return {
//     status: err.response?.status,
//     error: err.response?.data,
//   };
// };
// const deleteUserSession = async (response: any) => {
//   if (response.status == 401) (await cookies()).delete("session");
// };
