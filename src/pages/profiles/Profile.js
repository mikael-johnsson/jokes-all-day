// import React from 'react'
// import styles from "../../styles/Profile.module.css"
// import btnStyles from "../../styles/Button.module.css"
// import { useCurrentUser } from '../../context/CurrentUserContext'
// import { Button } from 'react-bootstrap'
// import { useSetProfileData } from '../../context/ProfileDataContext'

// const Profile = (props) => {
//     const {profile} = props
//     const {id, following_id, owner} = profile

//     const currentUser = useCurrentUser();
//     const is_owner = currentUser?.username === owner;
//     const {handleFollow, handleUnfollow} = useSetProfileData()

//   return (
//     <div
//     className="my-3 d-flex align-items-center">
//         <div>
//             <Link className="align-self-center" to={`/profiles/${id}`}>
//                 <div className={`mx-2 ${styles.WordBreak}`}>
//                     <strong>{owner}</strong>
//                 </div>
//             </Link>
//             <div className="text-right">
//                 {currentUser && !is_owner && (
//                     following_id ? (
//                         <Button 
//                             className={`${btnStyles.Button}`}
//                             onClick={() => handleUnfollow(profile)}
//                         >unfollow</Button>
//                     ) : (
//                         <Button 
//                         className={`${btnStyles.Button}`}
//                         onClick={() => handleFollow(profile)}
//                         >follow</Button>
//                     )
//                 )}
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Profile