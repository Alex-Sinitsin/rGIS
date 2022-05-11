import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import {ConfigProvider} from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import {configureStore} from './redux/store';
import {Provider} from 'react-redux';
import { YMaps } from 'react-yandex-maps';
import App from './App';
import './index.css';
import 'moment/locale/ru';

const store = configureStore();

ReactDOM.render(
        <ConfigProvider locale={ruRU}>
            <Provider store={store}>
                <BrowserRouter>
                    <YMaps>
                        <App/>
                    </YMaps>
                </BrowserRouter>
            </Provider>
        </ConfigProvider>,
    document.getElementById('root')
);
