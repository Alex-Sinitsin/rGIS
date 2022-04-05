import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import {ConfigProvider} from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import {configureStore} from './redux/store';
import {Provider} from 'react-redux';
import App from './App';
import './index.css';

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <ConfigProvider locale={ruRU}>
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </ConfigProvider>

    </React.StrictMode>,
    document.getElementById('root')
);
