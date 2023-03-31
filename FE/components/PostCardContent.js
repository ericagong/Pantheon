import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v, idx) => {
      if (v.match(/(#[^\s]+)/)) {
        return (
          <Link
            key={`${v}_${idx}`}
            href={{ pathname: "/hashtag", query: { tag: v.slice(1) } }}
            as={`/hashtag/${v.slice(1)}`}
          >
            {v}
          </Link>
        );
      }
      return v;
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
