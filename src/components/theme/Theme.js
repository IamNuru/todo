import { useEffect } from "react"
import{ connect } from "react-redux"
import "./theme.css"
import { setTheme } from "../../actions/Theme"


const Theme = ({theme:{light, lightTheme, darkTheme}, setTheme}) => {

    useEffect(() => {
        if(light){
            document.getElementById('body').style.backgroundColor = lightTheme.bgColor
            document.getElementById('main-app-wrapper').style.color = lightTheme.color 
        }else{
            document.getElementById('body').style.backgroundColor = darkTheme.bgColor
            document.getElementById('main-app-wrapper').style.color = darkTheme.color
        }
    }, [light])

    
    return (
        <div className="wrapper-theme">
            <input type="checkbox" name="checkbox" 
            className="switch-theme tooltipped" checked={light ? true : false} 
            onChange={() => setTheme(!light)}
            data-position="bottom" data-tooltip={light ? 'Light Mode' : 'Dark Mode'}  />
        </div>
    )
}

const mapStateToProps = state =>({
    theme: state.theme
})

export default connect(mapStateToProps, {setTheme})(Theme);
