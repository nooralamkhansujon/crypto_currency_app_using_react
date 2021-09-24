import React from "react";
import { Col, Typography } from "antd";
const { Text } = Typography;

function SingleStates({ icon, title, value }) {
  return (
    <Col className="coin-stats" key={title}>
      <Col className="coin-stats-name">
        <Text>{icon}</Text>
        <Text>{title}</Text>
      </Col>
      <Text className="stats">{value}</Text>
    </Col>
  );
}

export default SingleStates;
