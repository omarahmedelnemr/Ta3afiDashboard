import React from 'react';
import SideNavigation from './SideNavFunction';
import SideNavigationButton from './SideNavButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SideNavBar() {

  const navList = ['dashboard',"posts","artilces","supervisors"] 
    const lang = 'en'// localStorage.getItem('lang') 
    const compText = {
        Dashboard:         lang === 'en' ? "Dashboard":"الرئيسية",
        posts:             lang === 'en' ? "Posts":"المنشورات",
        postsUnapproved:   lang === 'en' ? "Posts (Pending)":"المنشورات",
        artilces:          lang === 'en' ? "Articles" : "المقالات" ,
        supervisors:       lang === 'en' ? "Supervisors" :"المسئولون",
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
            <SideNavigationButton route={"posts"} text={compText["posts"]} icon={<FontAwesomeIcon icon="fa-solid fa-comments" />}/>
            <SideNavigationButton route={"posts"} text={compText["postsUnapproved"]} icon={<FontAwesomeIcon icon="fa-solid fa-comments" />}/>
            <SideNavigationButton route={"artilces"} text={compText["artilces"]} icon={<FontAwesomeIcon icon="fa-solid fa-newspaper" />}/>
        </SideNavigation>
    </div>
)
}

export default SideNavBar;
