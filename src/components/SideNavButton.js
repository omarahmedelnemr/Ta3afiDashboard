import { useNavigate } from "react-router-dom";

function SideNavigationButton({route,text,icon,active=false,isSubItem=false}) {

    const navigate = useNavigate();
    const checkForHome = route === '' ? 'home':route.replace(/\//g, '-')
    function navButtonClick(event) {
        document.getElementsByClassName("backgroundActive")[0].style.setProperty("top",event.currentTarget.getBoundingClientRect().y+"px")
        document.getElementsByClassName("backgroundActive")[0].style.setProperty("display","block")

        var navButtons = document.getElementsByClassName("navButton");

        // Remove the "activeNavButton" class from the currently active button
        for (var i = 0; i < navButtons.length; i++) {
          if (navButtons[i].classList.contains("activeNavButton")) {
            navButtons[i].classList.remove("activeNavButton");
            break;
          }
        }
        // Add the "activeNavButton" class to the clicked button
        event.currentTarget.classList.add("activeNavButton");
        navigate("."+event.currentTarget.getElementsByClassName('route')[0].innerHTML)

    }
    return (
        <div id={checkForHome+"NavButton"} className={"navButton"+ (active?" activeNavButton":"") + (isSubItem?" subNavItem":"")} onClick={navButtonClick}>
            {icon}
            <p>{text}</p>
            <span className="route">./{route}</span>
        </div>
    );
}

export default SideNavigationButton;
