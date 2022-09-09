import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Link, Location} from "react-router-dom";
import {useQuery} from 'react-query';
import {fetchCoins} from "../api";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;

`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${props => props.theme.textColor};
  color: ${props => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;

  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }

  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 40px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  margin-top: 20px;
`;

const CryptoIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

export function Coins() {
    // const [coins, setCoins] = useState<ICoin[]>([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     (async () => {
    //         const json = await (await fetch("https://api.coinpaprika.com/v1/coins")).json();
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })();
    //
    // }, []);

    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>

            {isLoading ? <Loader>Loading...</Loader> :
                <CoinsList>
                    {data?.slice(0, 100).map(coin => <Coin key={coin.id}>
                        <Link to={`/${coin.id}`} state={{name: coin.name}}>
                            {/*<CryptoIcon src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>*/}
                            {coin.name} &rarr;
                        </Link>
                    </Coin>)}
                </CoinsList>
            }
        </Container>
    );
}

