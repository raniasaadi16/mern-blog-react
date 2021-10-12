import {useEffect} from 'react';
import AdminSideBar from '../../components/admin/AdminSideBar';
import Post from '../../components/Post';
import PostLoading from '../../components/PostLoading';
import { useParams } from 'react-router';
import {Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPost } from '../../redux/actions/postActions';
import { clearErrors } from '../../redux/actions/errorsAction';
import { getAllComments } from '../../redux/actions/commentAction';

export default function AdminSinglePost() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const isLoaded = useSelector(state => state.posts.isLoaded)
    const post = useSelector(state => state.posts.post);
    const err = useSelector(state => state.err);
    const comments = useSelector(state => state.comments.comments)

    useEffect(() => {
        dispatch(clearErrors());
        dispatch(getPost(id));
        dispatch(getAllComments(id));
    }, []);

    return (
        <div className='singlePost'>
            {err.msg && <Redirect to='/404'/>}
            <div className="row mx-0">
                <AdminSideBar link2={true}/>
                {!post || !isLoaded ? <PostLoading/> : (
                    <div className="col-lg-9" style={{marginTop:'70px'}}>
                        <Post post={post} comments={comments}/>
                    </div>
                )}
            </div>
        </div>
    )
}
