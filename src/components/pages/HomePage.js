import { useEffect } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import { getTodolists } from "../../actions/TodolistActions"
import Loader from '../inc/Loader';


const HomePage = ({mytodolists:{todolists, loading}, owner: {user, loggedin}, theme: {light, lightTheme, darkTheme}, getTodolists}) => {
    useEffect(() =>{
        if(user){
           getTodolists(user.id) 
        }
        //eslint-disable-next-line
    },[user])
    return (
        <div className="homepage">
            {
                !loggedin ? <p className="text-grey text-center"> 
                    In order to be able to keep track of your todos, You need to
                    <Link to="/register" className="link-hover"> Create an account</Link> with us. <br />
                    You already have an <Link to="/register" className="link-hover">account</Link>? You can please <Link to="/login" className="link-hover">login</Link>
                </p>
                :
                <div style={{diplay:'block'}}>
                    <h4 className="text-center w-full welcome-message" style={{marginBottom:'5rem'}}>Wecome Back! <span>{ user && user.username}</span></h4>
                    { !loading ? todolists?.length > 0 ?
                        <div className="">
                            <p className="text-grey text-center" style={{fontWeight:'500', fontSize:"1.4rem"}}> 
                                You have the following list of TodoList:
                            </p>
                            <ul className="homepagelists w-full">
                                {
                                    !loading ? (
                                        todolists?.length > 0 ? (
                                            todolists.map(t =>{
                                            return <li key={t.id} className="flex w-fullmy-4 px-4">
                                                <i className="material-icons center" style={{lineHeight:'unset', fontSize:'inherit', color:'purple'}}>event_note</i> 
                                                <Link to={`${t.id}/todos`} className="collection-item flex-grow">
                                                    <span className="badge">{t.todos?.length}</span>{t.name}
                                                    </Link>
                                                </li> 
                                            })
                                        ):('')
                                    ):(<Loader />)
                                }
                            </ul>   
                        </div>
                        :
                        <p className="text-grey text-center">
                            You have not yet create a todolist
                        </p>
                        :
                        <Loader />
                    }
                    
                    <div className="w-full text-center">
                        <button className="text-center waves-effect modal-trigger waves-light btn-small" href="#create_todolist_modal"><i className="material-icons left">create_new_folder</i>Create New</button>
                    </div>

                </div>
            }
           
            
        </div>
    )
}


const mapStateToProps = state =>({
    mytodolists: state.todolist,
    owner: state.user,
    theme: state.theme
})

export default connect(mapStateToProps,{getTodolists}) (HomePage);
