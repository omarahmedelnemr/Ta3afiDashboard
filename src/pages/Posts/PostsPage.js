import React from 'react';
import './Posts.css';
import PostBox from './components/Post';
import randomizeData from '../../public Func/RandomData';


function PostsPage() {
  const testData = randomizeData(10)
  const postList = []
  for(var p of testData){
    postList.push(<PostBox post={p}/>)
  }
  return (
    <div id="AdminPostsPage">
      <div id='PostsFilters'>
        <input type='text' placeholder='Search By Key Word'/>
      </div>
      <div id='AdminPostsFeed'>
          {postList}
      </div>

    </div>
  );
}

export default PostsPage;