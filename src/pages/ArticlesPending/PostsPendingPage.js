import React, { useRef, useEffect, useState } from 'react';
import './PostsPending.css';
import PostBox from './components/PostPending';
// import randomizeData from '../../public Func/RandomData';
import axios from '../../public Func/axiosAuth';
import globalVar from '../../public Func/globalVar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from 'react-router-dom';


function PostsPendingPage() {
    const [postList,setPostList] = useState([])
    const [isAtEnd, setIsAtEnd] = useState(true);
    const [loadBlock,setIncreaseLoadBlock] = useState(1);
    const [categoryList,setCategoryList]   = useState([])
    let [searchParams, setSearchParams] = useSearchParams();
    let keyword  = searchParams.get('keyword');
    let category  = searchParams.get('category');
    
    const [loadingStatus,setLoadingStatus] = useState('shown')
    const [activeCategory,setActiveCategory] = useState(category?category:-1)
    const [activeCategoryName,setActiveCategoryName] = useState("All")
    const divRef = useRef(null);

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
            if (isAtEnd){
            const res = await axios.get(
            globalVar.backendURL +
                "/super/unapproved-posts?loadBlock=" +
                loadBlock +
                "&effect=0" +
                (keyword ? "&searchText=" + keyword : '') +
                ((Number(category)!== -1 &&category) ? "&communityID=" + category : "")
            );
    
            const newPostList = res.data.map((post) => (
                <PostBox id={post.id} key={post.id} post={post} />
            ));
            if (newPostList.length >0){
                setPostList([...postList,newPostList]);
                setIncreaseLoadBlock(loadBlock + 1);
                setIsAtEnd(false)
            }
            else if(postList.length === 0){
                setPostList([<div className={'NoPostsToDisplay'}>
                                <p>No Posts To Display</p>
                            </div>])
            }
            else{
                setPostList([...postList,<p className='noMorePosts'>No More Posts To Display</p>])
            }
            setLoadingStatus("disabled")
        }
        } catch (err) {
            console.log("Error!!");
            console.log(err);
        }
        };
    
        fetchData();
    
        // Cleanup function to handle potential cancellation or cleanup tasks
        return () => {
        
        };
    }, [isAtEnd]);

    // Hnadling Scroll Down Behavior
    useEffect(() => {
        const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = divRef.current;
        // Check if scroll position is at the bottom of the div
        if(scrollHeight - scrollTop === clientHeight){
            setIsAtEnd(scrollHeight - scrollTop === clientHeight);
        }
        };

        const divElement = divRef.current;
        divElement.addEventListener('scroll', handleScroll);

        return () => {
        divElement.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Toggle Category List Options
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
    
    // Set an Active Community
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

    return (
        <div id="SuperPendingPostsPage"  ref={divRef}>
            <div className={'LoadingScreen '+loadingStatus} >
                <div className='loadingCircle'></div>
            </div>
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
        </div>
    );
}

export default PostsPendingPage;
