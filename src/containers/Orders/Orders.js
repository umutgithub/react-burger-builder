/**
 * Created by usevil on 4/5/18.
 */

import React,{ Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/wihtErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                //convert res obj to array
                for( let key in res.data) {
                   // this will do that but also want to add id prop to array => fetchedOrders.push(res.data[key])
                    fetchedOrders.push({
                       ...res.data[key],
                       id: key
                    });
                }

                this.setState({loading: false, orders: fetchedOrders});

            })
            .catch(err => {
                this.setState({loading:false});
            })
    }

   render() {
    console.log(this.state.orders);
       return (
        <div>
            { this.state.orders.map( order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}

                />
            ))}

        </div>
       );
   }

}

export default withErrorHandler(Orders,axios);