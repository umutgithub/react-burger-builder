/**
 * Created by usevil on 4/5/18.
 */

import React,{ Component } from 'react';
import Order from '../../components/Order/Order';

class Orders extends Component {
   render() {
       return (
        <div>
            <Order />
            <Order />
        </div>
       );
   }

}

export default Orders;