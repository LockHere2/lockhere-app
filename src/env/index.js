const environment = process.env.ENVIRONMENT || 'des';

const environments = {
    des: {
        apiUrl: 'http://10.0.2.2:3000/api',
        firebase_config: {
            apiKey: 'AIzaSyCQVD8rr0SG_Rn5iy27iK2s34lb8rINCik',
            authDomain: 'lockhere-e6edd.firebaseapp.com',
            databaseURL: 'https://lockhere-e6edd.firebaseio.com',
            storageBucket: 'lockhere-e6edd.appspot.com',
            messagingSenderId: '756897021746'
        }
    },
    prd: {

    }
};

export default environments[environment];
