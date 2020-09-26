const environment = process.env.ENVIRONMENT || 'des';

const environments = {
    des: {
        apiUrl: 'http://10.0.2.2:3000/api'
    },
    prd: {

    }
};

export default environments[environment];
