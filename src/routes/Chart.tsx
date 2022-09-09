import React from 'react';
import {useOutletContext} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import Apexcharts from "react-apexcharts";

interface IHistorycal {
    time_open: number
    time_close: number
    open: string
    high: string
    low: string
    close: string
    volume: string
    market_cap: number,
}

export function Chart() {
    const coinId = useOutletContext<string>();
    const {
        isLoading,
        data
    } = useQuery<IHistorycal[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));

    let error = "";

    if (!isLoading) {
        error = Object.keys(data as IHistorycal[]).join();
    }
    return (
        <div>
            {isLoading ? "Loading Chart..." : (error !== "error" ?
                <Apexcharts
                    type="candlestick"
                    series={[
                        {
                            name: coinId,
                            // [[Timestamp], [O, H, L, C]]
                            data: data?.map(price => {
                                return {x:new Date(price.time_close), y:[price.open, price.high, price.low, price.close]}
                            }) ?? []
                        }
                    ]}
                    options={{
                        chart: {
                            type: 'candlestick',
                            height: 450,
                            toolbar:{
                                show:false
                            },
                        },
                        title: {
                            text: coinId,
                            align: 'left',
                            style: {
                                fontSize:  '14px',
                                fontWeight:  'bold',
                                fontFamily:  "inherit",
                                color:  "#dcdde1"
                            },
                        },
                        tooltip:{
                            theme:"dark"
                        },
                        xaxis: {
                            labels:{
                                show:false
                            },
                            axisTicks:{
                                show:false
                            },
                            axisBorder:{
                                show:false
                            }
                        },
                        yaxis: {
                            labels:{
                                show:false
                            },
                            axisTicks:{
                                show:false
                            },
                            axisBorder:{
                                show:false
                            }
                        },
                        grid:{
                            show:false
                        },
                    }}
                /> : "Price Not Found.")
            }
        </div>
    );
}

