import BaseServiceV2 from './BaseServiceV2';

const ApiServiceV2 = {
    fetchData(param) {
        return new Promise((resolve, reject) => {
            BaseServiceV2(param)
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    reject(errors)
                })
        })
    },
}

export default ApiServiceV2