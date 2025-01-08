import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Routes} from "react-router";
import MovieDetail from "./components/MovieDetail/MovieDetail.jsx";
import Wishlist from "./components/Wishlist/Wishlist.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import WishlistProvider from "./context/WishlistProvider.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <WishlistProvider>
            <Navbar/>
            <Routes>
                <Route path="/" element={
                    <StrictMode>
                        <App/>
                    </StrictMode>}/>
                <Route path="/movies" element={<App/>}/>
                <Route path="/movie/:id" element={<MovieDetail/>}/>
                <Route path="/wishlist" element={<Wishlist/>}/>
            </Routes>
        </WishlistProvider>
    </BrowserRouter>
)
