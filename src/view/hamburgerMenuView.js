function hamburgerMenuView(props){

    // function showMenuACB() {
    //     document.getElementById("hamburgerMenu").classList.add("show");
    //     document.getElementById("openHamburgerMenuButton").classList.add("hide");
    // }

    function hideMenuACB() {
        document.getElementById("hamburgerMenu").classList.remove("show");
        document.getElementById("topBar").classList.remove("hide");
    }

    document.addEventListener('click', e => {
        if (!document.getElementById('hamburgerMenu').contains(e.target)
        && !document.getElementById('openHamburgerMenuButton').contains(e.target)){
            hideMenuACB();
        }
    });

    return (
            <div id="hamburgerMenu">
                <button id="closeHamburgerMenuButton" onClick={hideMenuACB}>x</button>
                <ul>
                    {props.children.map(child => <li key={child.props.children} onClick={hideMenuACB}>{child}</li>)}
                </ul>
            </div>
    );
}
export default hamburgerMenuView;