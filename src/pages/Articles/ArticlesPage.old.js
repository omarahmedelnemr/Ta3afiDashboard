import React, { useRef, useEffect, useState } from 'react';
import './Articles.css';
import ArticleBox from './components/Article';
// import randomizeData from '../../public Func/RandomData';
import axios from '../../public Func/axiosAuth';
import globalVar from '../../public Func/globalVar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from 'react-router-dom';


function ArticlesPage() {
    const [articleList,setArticleList] = useState([])
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
        axios.get(globalVar.backendURL + "/blog/category-list").then((res)=>{
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

    // Sending To Get The First Articles
    useEffect(() => {
        const fetchData = async () => {
        try {
            if (isAtEnd){
            const res = await axios.get(
            globalVar.backendURL +
                "/blog/article-feed-admin?loadBlock=" +
                loadBlock +
                "&effect=0" +
                (keyword ? "&searchText=" + keyword : '') +
                ((Number(category)!== -1 &&category) ? "&categoryID=" + category : "")
            );
    
            const newArticleList = res.data.map((article) => (
                <ArticleBox id={article.id} key={article.id} article={article} />
            ));
            if (newArticleList.length >0){
                setArticleList([...articleList,newArticleList]);
                setIncreaseLoadBlock(loadBlock + 1);
                setIsAtEnd(false)
            }
            else if(articleList.length === 0){
                setArticleList([<div className={'NoArticlesToDisplay'}>
                                <p>No Articles To Display</p>
                            </div>])
            }
            else{
                setArticleList([...articleList,<p className='noMoreArticles'>No More Articles To Display</p>])
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

    // Handling Scroll Down Behavior
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
        <div id="SuperArticlesPage"  ref={divRef}>
            <div className={'LoadingScreen '+loadingStatus} >
                <div className='loadingCircle'></div>
            </div>
            <div id='ArticlesSearchFilters'>
                <p>Find Articles</p>
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
            <div id='AdminArticlesFeed'>
            
                {articleList}  

            </div>
        </div>
    );
}

export default ArticlesPage;
