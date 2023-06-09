import { useMemo } from "react";
import { List, Button, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const LIST_STYLE = {
  style: { marginBottom: "20px" },
  grid: { gutter: 4, xs: 2, md: 3 },
  size: "small",
};

const ITEM_STYLE = {
  style: { marginTop: "20px" },
};

const FollowList = ({ header, data }) => {
  return (
    <List
      {...LIST_STYLE}
      header={header}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item {...ITEM_STYLE}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.username} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
