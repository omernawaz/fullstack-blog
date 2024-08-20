import { Card } from "@mui/material";
import DOMPurify from "dompurify";
import PostControls from "./PostControls";

const PostContent = ({ post }) => {
  const sanitizedContent = DOMPurify.sanitize(post.content);
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      <PostControls post={post} />
    </Card>
  );
};

export default PostContent;
