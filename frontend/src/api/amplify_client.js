import { API, Auth } from "aws-amplify";

export const amplify_client = {
    get: async ({ api, endpoint }) => {
        return await API.get(api, endpoint);
    },
    getById: async ({ api, endpoint, id }) => {
        return await API.get(api, `${endpoint}/${id}`);
    },
    post: async ({ api, endpoint, data }) => {
        return await API.post(api, endpoint, { body: data })
    },
    put: async ({ api, endpoint, data }) => {
        return await API.put(api, endpoint, { body: data })
    },
    remove: async ({ api, endpoint, id }) => {
        return await API.del(api, `${endpoint}/${id}`)
    }
}