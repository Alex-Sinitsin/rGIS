import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {ConfigProvider} from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import {configureStore} from './redux/store';
import {Provider} from 'react-redux';
import {YMaps} from 'react-yandex-maps';
import App from './App';
import './index.css';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <YMaps>
                <ConfigProvider locale={ruRU}>
                    <App/>
                </ConfigProvider>
            </YMaps>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
