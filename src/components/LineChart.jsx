import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import { useGetCryptoHistoryQuery } from "../services/CryptoApi";
import Loader from "react-loader-spinner";
const { Title } = Typography;

function LineChart({ timePeriod, currentPrice, coinName, coinId }) {
  const { data, isFetching } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const [coinHistory, setCoinHistory] = useState(data?.data);

  useEffect(() => {
    setCoinHistory(data?.data);
  }, [timePeriod, setCoinHistory, data]);

  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.history?.length; i++) {
    coinPrice.push(coinHistory.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory.history[i].timestamp).toLocaleDateString()
    );
  }

  const dataList = {
    labels: coinTimestamp,
    datasets: [
      {
        label: `price in USD`,
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

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
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.change}
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: ${currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={dataList} options={options} />
    </>
  );
}

export default LineChart;
