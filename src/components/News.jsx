/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/CryptoNewsApi.js";
import { useGetCryptosQuery } from "../services/CryptoApi.js";
import Loader from "react-loader-spinner";
const { Text, Title } = Typography;
const { Option } = Select;

function News({ simplified }) {
  const count = simplified ? 10 : 100;

  //set default crypto category for getting news via
  //crypto category
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  //get all cryptoList by passing count
  const { data: cryptoList, isFetching: isCryptosFetching } =
    useGetCryptosQuery(count);

  //state for all cryptos
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);

  //get all cryptoNews  by passing crypto category
  const { data, isFetching } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 12,
  }); //end statment

  console.log(cryptoList);

  //useEffect for getting crypto news whenever the crypto category has been updated
  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes("")
    );
    setCryptos(filteredData);
  }, [cryptoList]);
  //end of useEffect

  if (isCryptosFetching)
    return (
      <Loader
        type="Circles"
        color="#00BFFF"
        height={80}
        width={80}
        timeout={3000}
      />
    );
  if (isFetching) {
    return (
      <Loader
        type="Circles"
        color="#00BFFF"
        height={80}
        width={80}
        timeout={3000}
      />
    );
  }

  //if crypto news Data not still comming then show loading
  if (!data?.value) return "Loading....";

  //demoImage if any crypo news has no image then will show demoImage
  const demoImage =
    "https://www.bing.com/th?id=OVFT._ayKcd9lc4Yfv3X8RYAItC&pid=News";

  return (
    <Row gutter={[24, 24]}>
      {/* select options section for selecting crypto category  */}
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) > 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptos?.map((currency) => (
              <Option key={currency.id} value={currency.name}>
                {currency.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {/* end of crypto category select option  */}

      {/* below I am showing all the crypto related news  */}
      {data?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="moreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt={news.name}
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt={news.name}
                  />
                  <Text className="provider-name">
                    {news?.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
      {/* end of crypto news list section  */}
    </Row>
  );
}

export default News;
