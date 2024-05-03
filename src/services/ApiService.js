import BaseService from './BaseService';

const ApiService = {
    fetchData(param) {
        console.log("p",param)
        return new Promise((resolve, reject) => {
            BaseService(param)
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    console.log("err",errors)
                    reject(errors)
                })
        })
    },
}

export default ApiService;