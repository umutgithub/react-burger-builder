/**
 * Created by usevil on 2/27/18.
 */
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-bc.firebaseio.com/'
});

export default instance;