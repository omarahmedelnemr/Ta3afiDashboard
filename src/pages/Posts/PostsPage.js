import React, { useEffect, useState } from 'react';
import './Posts.css';
import PostBox from './components/Post';
// import randomizeData from '../../public Func/RandomData';
import axios from 'axios';
import globalVar from '../../public Func/globalVar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from 'react-router-dom';


function PostsPage() {
    const [postList,setPostList] = useState([])
    const [loadBlock,setIncreaseLoadBlock] = useState(1);
    const [categoryList,setCategoryList]   = useState([])
    let [searchParams, setSearchParams] = useSearchParams();
    let keyword  = searchParams.get('keyword');
    let category  = searchParams.get('category');
    
    console.log("Keyword: " ,keyword)
    console.log("Category: " ,category) 
    const [activeCategory,setActiveCategory] = useState(category?category:-1)
    const [activeCategoryName,setActiveCategoryName] = useState("All")

    // Getting All Available Categories
    useEffect(()=>{
        axios.get(globalVar.backendURL + "/community/community-list").then((res)=>{
            console.log(res.data)
            const categoryListElements = []
            // Remove Active From Default All Category
            if(Number(activeCategory) !== -1){
                categoryListElements.push(<span id='-1' className='categoryOption' onClick={SelectCategory}>All</span>)
            }else{
                categoryListElements.push(<span id='-1' className='categoryOption activeCategory' onClick={SelectCategory}>All</span>)

            }

            for(var cat of res.data){

                if(Number(activeCategory) === Number(cat.id)){
                    setActiveCategoryName(cat.name)
                    categoryListElements.push(<span id={cat.id} key={cat.id} className={'categoryOption activeCategory'} onClick={SelectCategory}>{cat.name}</span>)
                }else{
                    categoryListElements.push(<span id={cat.id} key={cat.id} className={'categoryOption'} onClick={SelectCategory}>{cat.name}</span>)

                }
            }

            setCategoryList(categoryListElements);
        }).catch((err)=>{
            console.log("Error!!");
            console.log(err);
        })
    },[])

    // Sending To Get The First Posts
    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await axios.get(
            globalVar.backendURL +
                "/community/post-feed?loadBlock=" +
                loadBlock +
                "&effect=0" +
                (keyword ? "&searchText=" + keyword : '') +
                (Number(category)!== -1 ? "&communityID=" + category : "")
            );
    
            const newPostList = res.data.map((post) => (
            <PostBox id={post.id} key={post.id} post={post} />
            ));
    
            setPostList(newPostList);
            setIncreaseLoadBlock(loadBlock + 1);
        } catch (err) {
            console.log("Error!!");
            console.log(err);
        }
        };
    
        fetchData();
    
        // Cleanup function to handle potential cancellation or cleanup tasks
        return () => {
        
        };
    }, []);


  function DropDownMenuToggle(event){
    if (event.currentTarget.querySelector(".arrowIcon").style.rotate === '180deg'){
        event.currentTarget.querySelector(".arrowIcon").style.rotate = "0deg"
        event.currentTarget.querySelector(".CategoryOptionsDropList").style.height = "0px"

    }else{
        event.currentTarget.querySelector(".arrowIcon").style.rotate = "180deg"

        //// Get List Max Height
        const dropDownListHeight = event.currentTarget.querySelector(".CategoryOptionsDropList").scrollHeight;
        event.currentTarget.querySelector(".CategoryOptionsDropList").style.height = dropDownListHeight+"px"
        
    }

  }
  
  function SelectCategory(event){
    setActiveCategory(Number(event.currentTarget.id))  
    setActiveCategoryName(event.currentTarget.innerHTML)  
    event.currentTarget.parentElement.querySelector(".activeCategory").classList.remove("activeCategory")
    event.currentTarget.classList.add("activeCategory") 
  }

  function Search(event){
    const inp = event.currentTarget.parentElement
    const keyword   = inp.querySelector(".SearchKeyWord").value?inp.querySelector(".SearchKeyWord").value:""
    const category  = activeCategory ? activeCategory : 'All'


    setSearchParams({keyword:keyword,category:category})
    console.log(keyword)
    window.location.reload()
  }
//   const dotRef = useRef(null);
//   useEffect(()=>{
//     const observe = new IntersectionObserver((entries) =>{
//       entries.forEach(entry=>{
//         if (entries.isIntersecting){
//           console.log("Reached The End !!")
//         }
//       })
//     })
//     observe.observe(dotRef.current)
//     return ()=>{
//       observe.unobserve(dotRef.current)
//     }
//   },[])
  return (
    <div id="AdminPostsPage">
        <div id='PostsSearchFilters'>
            <p>Find Posts</p>
            <div className='row'> 
                <input type='text' className='SearchKeyWord' placeholder='Search By Key Word' defaultValue={keyword?keyword:""}/>
                <div className='categories' onClick={DropDownMenuToggle}>
                    <span className='placeHolder'>{activeCategoryName}</span>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-down" className='arrowIcon' />
                    <div className='CategoryOptionsDropList'>
                        {categoryList}
                    </div>

                </div>
                <button className='searchButton' onClick={Search }><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
            </div> 

        </div>
      <div id='AdminPostsFeed'>
          {postList}

      </div>
      {/* <span ref={dotRef}>.</span> */}

    </div>
  );
}

export default PostsPage;
