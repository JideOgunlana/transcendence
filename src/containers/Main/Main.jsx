
import './main.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {Hero, Signup, Userprofile, Dashboard, Settings, HistoryAll, HistoryUser} from '../../containers'

const Main = ({ showSignup, userSignedUp, showDashboard, handleUserSignedUp, handleSignup, handleGoToDashboard, lang, setLang, sound, setSound }) => {

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
                {/* <div className='fullHistory d-flex justify-content-cener mTop32'>
                    <HistoryAll />
                </div> */}
                {/* <div className='userHistory d-flex justify-content-cener mTop32'>
                    <HistoryUser />
                </div> */}
                {
                    (
                        <Route path='settings'
                            element={<Settings lang={lang} setLang={setLang} sound={sound} setSound={setSound} />}>
                        </Route>
                    )
                }
            </Routes>
        </main>
    );
}


export default Main;