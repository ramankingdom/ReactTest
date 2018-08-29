const axios = require('axios');

const get = (url) => {
	return axios.get(url)
}

const post = (url, data) => {
	return axios.post(url,data);
}

const patch = (url, data) => {
	return axios.patch(url,data);
}

const put = (url, data) => {
	return axios.put(url,data);
}
const deleteTodo = (url, data) => {
	return axios.delete(url);
}

export { get, post, patch, put, deleteTodo }