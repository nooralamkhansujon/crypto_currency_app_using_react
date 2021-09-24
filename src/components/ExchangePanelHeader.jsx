import React from "react";
import { Row, Col, Typography, Avatar } from "antd";
import millify from "millify";

const { Text } = Typography;

function ExchangePanelHeader({ exchange }) {
  return (
    <Row>
      <Col span={6}>
        <Text>
          <strong>{exchange?.rank}.</strong>
        </Text>
        <Avatar className="exchange-image" src={exchange.iconUrl}></Avatar>
        <Text>
          <strong>{exchange?.name}</strong>
        </Text>
      </Col>
      <Col span={6}>${millify(exchange?.volume)}</Col>
      <Col span={6}>{millify(exchange?.numberOfMarkets)}</Col>
      <Col span={6}>{millify(exchange?.marketShare)}%</Col>
    </Row>
  );
}

export default ExchangePanelHeader;
