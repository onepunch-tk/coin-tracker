import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Coin} from "./Coin";
import {Coins} from "./Coins";
import {Price} from "./Price";
import {Chart} from "./Chart";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Coins/>}/>
                <Route path=":coinId" element={<Coin/>} >
                    <Route index element={<Chart/>}/>
                    <Route path={`price`} element={<Price />}/>
                    <Route path={`chart`} element={<Chart />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

