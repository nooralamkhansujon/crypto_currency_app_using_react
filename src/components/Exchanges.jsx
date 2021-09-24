import React from "react";
import { useGetExchangesQuery } from "../services/CryptoApi.js";
import { Row, Col, Collapse } from "antd";
import Loader from "react-loader-spinner";

import HTMLReactParser from "html-react-parser";
import ExchangePanelHeader from "./ExchangePanelHeader.jsx";

const { Panel } = Collapse;

function Exchanges() {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangeList = data?.data?.exchanges;

  console.log(data);
  if (isFetching)
    return (
      <Loader
        type="Circles"
        color="#00BFFF"
        height={80}
        width={80}
        timeout={3000}
      />
    );

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volumne</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangeList?.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <ExchangePanelHeader key={exchange.id} exchange={exchange} />
                }
              >
                {HTMLReactParser(exchange?.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Exchanges;
