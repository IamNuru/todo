import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"

const ProtectedRoute = ({ user: {user, loggedin}, component: Component, ...rest}) => {
    
    return (
        <Route { ...rest } render={
            props =>{
                if(loggedin){
                    return <Component {...rest} {...props} />
                }else{
                    return <Redirect to={
                        {
                            pathname: "/un-authorised-page",
                            state:{
                                from: props.location
                            }
                        }
                    } />
                }
            }
        }>

        </Route>
    )
}


const mapStateToProps = state =>({
    user: state.user
})
export default connect(mapStateToProps)(ProtectedRoute);