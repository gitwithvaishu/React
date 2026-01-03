import axios from "axios";
// const BASE_URL = import.meta.env.VITE_MOCKAPI_BASE_URL;

const http =axios.create({
    baseURL: import.meta.env.VITE_MOCKAPI_BASE_URL,
    headers: {"content-type":"application/json"},
    timeout: 10000,
});

http.interceptors.response.use(({data})=> data);

export const api = {
    todos:{
        getAll(params ={}) {
            return (
                http.get("todos", {params})
                .catch((error)=> error?.response.status === 404 ? [] : Promise.reject(error))
            );

            // const searchParams = new URLSearchParams(params).toString();
            // return(   
            //     fetch(`${BASE_URL}/todos?${searchParams}`,{
            //         method: "GET",
            //         headers: {"content-type":"application/json"},
            //     })
            //     .then((response) => {
            //         if(response.ok) return response.json();
            //         if(response.status===404) return [];
            //     })
            // );
        },

        create(data) {
            return (
                http.post("todos", data)
            );
            // return (
            //     fetch(`${BASE_URL}/todos`,{
            //         method: "POST",
            //         headers: {"content-type":"application/json"},
            //         body: JSON.stringify(data),
            //         })
            //     .then((response) =>  !!response.ok && response.json())
            // );
        },

        update(id, data) {
            return (
                http.put(`todos/${id}`, data)
            );
            // return(
            //     fetch(`${BASE_URL}/todos/${id}`,{
            //         method: "PUT",
            //         headers: {"content-type":"application/json"},
            //         body: JSON.stringify(data),
            //     })
            //     .then((response) =>  !!response.ok && response.json())
            // );
        },

        delete(id) {
            return (
                http.delete(`todos/${id}`)
            );
            // return(
            //     fetch(`${BASE_URL}/todos/${id}`,{
            //         method: "DELETE",
            //     })
            //     .then((response) =>  !!response.ok && response.json())
            // );
        }
    }
} 