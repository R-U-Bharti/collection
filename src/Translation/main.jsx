// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from "react-redux";
import rootReducer from "./reducer/index.js";
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from '@/Components/ErrorBoundary.jsx';
import i18next from './Translation/TranslationProvider.jsx'
import { I18nextProvider } from 'react-i18next'

const store = configureStore({
    reducer: rootReducer,
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}> // Translation Wrap
            <Provider store={store}>
                <BrowserRouter>
                    <ErrorBoundary errorMsg="Something went wrong. Please try again later !">
                        <Suspense fallback={<span>Loading...</span>}>
                            <App />
                        </Suspense>
                    </ErrorBoundary>
                </BrowserRouter>
            </Provider>
        </I18nextProvider>
    </React.StrictMode>,
)


// In App.jsx to disable context menu
useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
    })
})