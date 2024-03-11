import React from 'react';
import SideNavigation from './SideNavFunction';
import SideNavigationButton from './SideNavButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SideNavBar() {

  const navList = ['dashboard',"posts","posts-pending","articles","issues","articles-pending","supervisors"] 
    const lang = 'en'// localStorage.getItem('lang') 
    const compText = {
        Dashboard:         lang === 'en' ? "Dashboard":"الرئيسية",
        posts:             lang === 'en' ? "Posts":"المنشورات",
        postsPending:   lang === 'en' ? "Posts (Pending)":"المنشورات المتوقفه ",
        Articles:          lang === 'en' ? "Articles" : "المقالات" ,
        ArticlesPending:          lang === 'en' ? "Articles (Pending)" : "المقالات المتوقفه" ,
        supervisors:       lang === 'en' ? "Supervisors" :"المسئولون",
        Issues:            lang === 'en' ? "Issues":"البلاغات" 
    }
    function showHideMinu(){
        document.getElementsByClassName('sideNav')[0].style.setProperty('left','0px')
        
        document.querySelector('.sideNav').querySelector('.backgroundBlock').style.setProperty('display','block')
    }
return (
    <div>
        <div className="sideMinu row">
            <FontAwesomeIcon icon="fa-solid fa-list" onClick={showHideMinu} />   
        </div>
        <SideNavigation navList={navList}>
            <SideNavigationButton route={"dashboard"} text={compText["Dashboard"]} icon={<FontAwesomeIcon icon="fa-solid fa-chart-pie" />} active={true}/>
            <SideNavigationButton route={"supervisors"} text={compText["supervisors"]} icon={<FontAwesomeIcon icon="fa-solid fa-user-tie" />}/>
            <SideNavigationButton route={"posts-pending"} text={compText["postsPending"]} icon={<FontAwesomeIcon icon="fa-solid fa-comments" />}/>
            <SideNavigationButton route={"posts"} text={compText["posts"]} icon={<FontAwesomeIcon icon="fa-solid fa-comments" />}/>
            <SideNavigationButton route={"articles-pending"} text={compText["ArticlesPending"]} icon={<FontAwesomeIcon icon="fa-solid fa-newspaper" />}/>
            <SideNavigationButton route={"articles"} text={compText["Articles"]} icon={<FontAwesomeIcon icon="fa-solid fa-newspaper" />}/>
            <SideNavigationButton route={"issues"} text={compText["Issues"]} icon={<FontAwesomeIcon icon="fa-solid fa-flag" />}/>
        </SideNavigation>
    </div>
)
}

export default SideNavBar;
