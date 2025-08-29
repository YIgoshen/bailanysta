import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

// import axios from "../axios"
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {

  const dispatch = useDispatch()
  
  const userData = useSelector( state => state.auth.data)

  const { posts, tags } = useSelector( state => state.posts)


  const isPostsLoading = posts.status === "loading"
  const isTagsLoading = tags.status === "loading"

  useEffect(() => {
    // axios.get('posts')
    dispatch(fetchPosts())
    dispatch(fetchTags())
  }, [])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {/* {!posts.length ? "Пока постов нет" : ""} */}
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => 
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            )
            :
            (
              <Post
                id={obj._id}
                key={index}
                title={obj.title}
                // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                user={{
                  // avatarUrl:
                    // 'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                  fullName: obj.user.fullName,
                }}
                createdAt={obj.createdAt}
                viewsCount={150}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Test name 1',
                  // avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Тестовый комментарий 1',
              },
              {
                user: {
                  fullName: 'Test name 2',
                  // avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'Тестовый комментарий 2',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
