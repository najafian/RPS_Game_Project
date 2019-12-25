import React from 'react';
import ReactDOM from 'react-dom';
import './contents/styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@syncfusion/ej2/bootstrap.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import initialize from "./shared/reducer/store";
import {Route, Router, Switch} from "react-router";
import {createBrowserHistory} from 'history'
import LoginPage from "./component/authentication/login/login-page";
import {bindActionCreators} from "redux";
import {ACTION_TYPES} from "./component/authentication/reducer/authentication-reducer";
import MainRpsComponent from "./component/games/rps/main-rps-component";
import InitialRpsPlayersComponent from "./component/games/rps/initial-rps-component";


export const globalStore = initialize();

export const clearAuthentication = (messageKey: string) => (dispatch: any) => {
    dispatch(messageKey);
    dispatch({
        type: ACTION_TYPES.CLEAR_AUTH
    });
};

bindActionCreators({clearAuthentication}, globalStore.dispatch);

ReactDOM.render(
    <Provider store={globalStore}>
        <div className="fullScreen-page-class">
            <div className="image-background-class">
                <div className="center-form-class">
                    <Router history={createBrowserHistory()}>
                        <Switch>
                            {/*<Route exact path="*" component={LoginPage}/>*/}
                            <Route path="/initialize-rps-config" component={InitialRpsPlayersComponent}/>
                            <Route path="/main-rps-game" component={MainRpsComponent}/>
                            <Route exact component={LoginPage} path="*"/>
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
        <div className="page-footer-class">This is Demo Project By Mehdi Najafian</div>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
