import { List } from "antd";
import CommentCard from "./CommentCard";
import PropTypes from "prop-types";

const CommentList = ({ comments }) => {
  return (
    <List
      header={`${comments.length}개의 댓글`}
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={(item) => (
        <li>
          <CommentCard {...item} />
        </li>
      )}
    />
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};

export default CommentList;
