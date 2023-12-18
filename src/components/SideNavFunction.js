import "./styles/SideNav.css"
import logoImage from '../content/smallLogo.png'
import { useEffect } from "react";

function SideNavigation({navList,children}) {
    
    const lang = 'en'// localStorage.getItem('lang') 
    const compText = {
        welcome:     lang === 'en' ? "welcome Back":" اهلا بعودتك",
        issu:        lang === 'en' ? "If you Want to Report a Problem, Suggest a Feature or Request a Infomation Change Please Contact us":"اذا كنت ترغب في الابلاغ عن مشكلة, اقتراح, او طلب تعديل بالرجاء التواصل معنا",
        
    }
    useEffect(()=>{
        const endpoints = window.location.pathname.split("/")
        const path = endpoints[endpoints.length-1].toLowerCase()
        try{
            try{
                document.getElementsByClassName("activeNavButton")[0].classList.remove("activeNavButton")
            }catch{
                console.log("No Active Found")
            }
            document.getElementsByClassName("backgroundActive")[0].style.setProperty("display","block")

           if(navList.includes(path)){
            
                document.getElementById(path+"NavButton").classList.add("activeNavButton")
                document.getElementsByClassName("backgroundActive")[0].style.setProperty("top",document.getElementById(path+"NavButton").getBoundingClientRect().y+"px")

            }else{
                document.getElementsByClassName("backgroundActive")[0].style.setProperty("display","none")
            }
        }catch(err){
            console.log("loading")
            console.log(err)
        }
    },[navList])

    function blockBackground(){
        if (lang === 'en'){
            document.getElementsByClassName('sideNav')[0].style.setProperty('left','-280px')
        }else{
            document.getElementsByClassName('sideNav')[0].style.setProperty('right','-280px')
        }
        document.getElementsByClassName('sideNav')[0].querySelector('.backgroundBlock').style.setProperty('display','none')

    }

    return (
        <div className="sideNav">
            <div className="backgroundBlock" onClick={blockBackground}></div>

            <div className="top">
                <div className="welcome">
                    <img className="logoimage" src={logoImage} alt={"Ta3afi Logo"}/>
                    <p>{compText["welcome"]}</p>
                </div>
            </div>
            <div className="backgroundActive"></div>
            <div className="center">
                {children}        
            </div>
            <div className="bottom">
                {/* <a href={"./reportIssu"}>
                    <div className='reportIssu'>
                        <FontAwesomeIcon icon="fa-solid fa-circle-question" />
                        <div className='reportIssuText'>
                            <p>{compText['issu']}</p>
                        </div>
                    </div>
                </a> */}
            </div>
        </div>
    );
}

export default SideNavigation;
