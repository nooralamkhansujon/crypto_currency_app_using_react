import React from "react";
import { Row, Typography } from "antd";
const { Title } = Typography;

function CryptoDetailsLink({ link }) {
  return (
    <Row className="coin-link" key={link.name}>
      <Title level={5} className="link-name">
        {link.type}
      </Title>
      <a href={link.url} target="_blank" rel="noreferrer">
        {link.name}
      </a>
    </Row>
  );
}

export default CryptoDetailsLink;
