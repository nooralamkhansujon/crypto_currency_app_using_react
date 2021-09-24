import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import SingleStates from "./SingleStates.jsx";
import SingleGenericStats from "./SingleGenericStats.jsx";
import CryptoDetailsLink from "./CryptoDetailsLink.jsx";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import LineChart from "./LineChart.jsx";
import Loader from "react-loader-spinner";
import { useGetSingleCryptoQuery } from "../services/CryptoApi.js";

const { Title } = Typography;
const { Option } = Select;

function CryptoDetails() {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetSingleCryptoQuery(coinId);
  // const [coinHistory, setCoinHisotry]  = useState("7d");
  const cryptoDetails = data?.data?.coin;
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

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  return (
    <Col className="coin-detail-container">
      {/* single coin heading  */}
      <Col className="coin-heading">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.slug}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </Col>
      {/* end of single coin heading  */}

      {/* timeperiod select option box  */}
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      {/* end of timeperiod select option box  */}

      {/* line chart */}
      <LineChart
        timePeriod={timePeriod}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
        coinId={cryptoDetails.id}
      />
      {/* end of line chart */}
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            {/* crypto coin title and statistics */}
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value statistics
            </Title>
            <p>
              An Overview showing the stats of {cryptoDetails.name} , such as
              the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {/* show rank price 24h volumn */}
          {stats.map(({ icon, title, value }) => (
            <SingleStates
              key={Math.random() * 1000}
              icon={icon}
              title={title}
              value={value}
            />
          ))}
          {/* end of show rank price 24h volumn */}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Stats Info
            </Title>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <SingleGenericStats
              key={Math.random() * 10000}
              icon={icon}
              title={title}
              value={value}
            />
          ))}
        </Col>
      </Col>

      {/* coin description link  */}
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}?
          </Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links?.map((link) => (
            <CryptoDetailsLink link={link} key={Math.random() * 100000} />
          ))}
        </Col>
      </Col>
      {/* end of coin description  */}
    </Col>
  );
}

export default CryptoDetails;
