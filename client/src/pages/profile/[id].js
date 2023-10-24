// import React, { useEffect, useState } from 'react'

// import Info from '../../components/profile/Info'
// import Posts from '../../components/profile/Posts'
// import Saved from '../../components/profile/Saved'

// import { useSelector, useDispatch } from 'react-redux'
// import LoadIcon from '../../images/loading.gif'
// import { getProfileUsers } from '../../redux/actions/profileAction'
// import { useParams } from 'react-router-dom'


// const Profile = () => {
//     const { profile, auth } = useSelector(state => state)
//     const dispatch = useDispatch()

//     const { id } = useParams()
//     const [saveTab, setSaveTab] = useState(false)

//     useEffect(() => {
//         if(profile.ids.every(item => item !== id)){
//             dispatch(getProfileUsers({id, auth}))
//         }
//     },[id, auth, dispatch, profile.ids])

//     return (
//         <div className="profile">
            
//             <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

//             {
//                 auth.user._id === id &&
//                 <div className="profile_tab">
//                     <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>Posts</button>
//                     <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}>Saved</button>
//                 </div>
//             }

//             {
//                 profile.loading 
//                 ? <img className="d-block mx-auto" src={LoadIcon} alt="loading" />
//                 : <>
//                     {
//                         saveTab
//                         ? <Saved auth={auth} dispatch={dispatch} />
//                         : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
//                     }
//                 </>
//             }
            
//         </div>
//     )
// }

// export default Profile

//gpt:

// import React, { useEffect, useState, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import LoadIcon from '../../images/loading.gif';
// import { getProfileUsers } from '../../redux/actions/profileAction';
// import { useParams } from 'react-router-dom';

// import Info from '../../components/profile/Info';
// import Posts from '../../components/profile/Posts';
// import Saved from '../../components/profile/Saved';

// const Profile = () => {
//     const { profile, auth } = useSelector(state => state);
//     const dispatch = useDispatch();
//     const { id } = useParams();
//     const [saveTab, setSaveTab] = useState(false);

//     const profileTabRef = useRef(null);

//     useEffect(() => {
//         if (profile.ids.every(item => item !== id)) {
//             dispatch(getProfileUsers({ id, auth }));
//         }

//         // Add a click event listener to the document
//         const handleOutsideClick = e => {
//             if (profileTabRef.current && !profileTabRef.current.contains(e.target)) {
//                 setSaveTab(false);
//             }
//         };

//         document.addEventListener('click', handleOutsideClick);

//         // Clean up the event listener when the component unmounts
//         return () => {
//             document.removeEventListener('click', handleOutsideClick);
//         };
//     }, [id, auth, dispatch, profile.ids]);

//     return (
//         <div className="profile">
//             <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

//             {auth.user._id === id && (
//                 <div className="profile_tab" ref={profileTabRef}>
//                     <button
//                         className={saveTab ? '' : 'active'}
//                         onClick={() => setSaveTab(false)}
//                     >
//                         Posts
//                     </button>
//                     <button
//                         className={saveTab ? 'active' : ''}
//                         onClick={() => setSaveTab(true)}
//                     >
//                         Saved
//                     </button>
//                 </div>
//             )}

//             {profile.loading ? (
//                 <img className="d-block mx-auto" src={LoadIcon} alt="loading" />
//             ) : (
//                 <>
//                     {saveTab ? (
//                         <Saved auth={auth} dispatch={dispatch} />
//                     ) : (
//                         <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default Profile;

import React, { useEffect, useState } from 'react';
import Info from '../../components/profile/Info';
import Posts from '../../components/profile/Posts';
import Saved from '../../components/profile/Saved';
import { useSelector, useDispatch } from 'react-redux';
import LoadIcon from '../../images/loading.gif';
import { getProfileUsers } from '../../redux/actions/profileAction';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { profile, auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const { id } = useParams();
    const [saveTab, setSaveTab] = useState(false);

    useEffect(() => {
        if (profile.ids.every(item => item !== id)) {
            dispatch(getProfileUsers({ id, auth }));
        }
    }, [id, auth, dispatch, profile.ids]);

    if (profile.loading) {
        return <img className="d-block mx-auto" src={LoadIcon} alt="loading" />;
    }

    const displayContent = saveTab ? <Saved auth={auth} dispatch={dispatch} /> : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />;

    return (
        <div className="profile">
            <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
            {auth.user && auth.user._id === id && (
                <div className="profile_tab">
                    <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>
                        Posts
                    </button>
                    <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}>
                        Saved
                    </button>
                </div>
            )}
            {displayContent}
        </div>
    );
};

export default Profile;
