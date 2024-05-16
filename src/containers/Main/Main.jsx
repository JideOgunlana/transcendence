
import './main.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {Hero, Signup, Userprofile, Dashboard, HistoryAll, HistoryUser} from '../../containers'

const Main = ({ showSignup, userSignedUp, showDashboard, handleUserSignedUp, handleSignup, handleGoToDashboard }) => {

    const mainClassName = showSignup || userSignedUp || showDashboard ? 'transition-main' : '';

    return (
        <main className={`${mainClassName}`}>
            <Routes>
                {
                    (
                    <Route path='/'
                        element={<Hero handleSignup={handleSignup}/>}
                    >
                    </Route>
                    )
                }
                {
                    (
                    <Route path='signup'
                        element={<Signup handleUserSignedUp={handleUserSignedUp} handleGoToDashboard={handleGoToDashboard}/>}
                    >
                    </Route>
                    )
                }
                {
                    (
                        <Route path='userprofile'
                           element={ <Userprofile handleGoToDashboard={handleGoToDashboard} />}
                        >
                        </Route>
                    )
                }
                {
                   (
                    <Route path='dashboard'
                        element={<Dashboard />}>
                    </Route>)
                }
                {/* <div className='fullHistory mTop32'>
                    <HistoryAll />
                </div> */}
                {/* <div className='userHistory mTop32'>
                    <HistoryUser />
                </div> */}
            </Routes>
        </main>
    );
}


export default Main;


// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { Hero, Signup, Userprofile, Dashboard, HistoryAll, HistoryUser } from '../../containers';

// const Main = ({ showSignup, userSignedUp, showDashboard, handleUserSignedUp, handleSignup }) => {
//     return (
//         <main className="main-container-transition">
//                     {!userSignedUp && !showDashboard && !showSignup && (
//                         <Route path="/" element={<Hero handleSignup={handleSignup} />} />
//                     )}
//                     {showSignup && (
//                         <Route path="/signup" element={<Signup handleUserSignedUp={handleUserSignedUp} />} />
//                     )}
//                     {userSignedUp && (
//                         <Route path="/profile" element={<Userprofile />} />
//                     )}
//                     {showDashboard && (
//                         <Route path="/dashboard" element={<Dashboard />} />
//                     )}
//                     {/* Add routes for HistoryAll and HistoryUser if needed */}
//                     {/* <Route path="/history/all" element={<HistoryAll />} />
//                     <Route path="/history/user" element={<HistoryUser />} /> */}
//                     {/* Redirect to home page if no matching route */}
//                     <Route path="*" element={<Navigate to="/" />} />
//         </main>
//     );
// }

// export default Main;
