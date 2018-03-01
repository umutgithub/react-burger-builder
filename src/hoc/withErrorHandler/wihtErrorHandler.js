/**
 * Created by usevil on 2/28/18.
 */
import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';


const withErrorHandler = (WrappedComponent, axios) => {
   return class extends Component {

        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log('[error response]' , error);
                this.setState({error: error});
            });
        }
        /* everytime withErrorHandler wrapped to a componnent. New instance of interceptor will be created.
         componetWillUnmount simply prevent the memory leak.
        */
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        clearError = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modelClosed={this.clearError}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>

            );
        }
   }
};

export default withErrorHandler;