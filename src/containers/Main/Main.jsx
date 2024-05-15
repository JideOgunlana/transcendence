
import './main.css';
import {Hero, Signup, Userprofile, Dashboard, HistoryAll, HistoryUser} from '../../containers'

const Main = ({ showSignup, userSignedUp, showDashboard, handleUserSignedUp, handleSignup, handleGoToDashboard }) => {

    const mainClassName = showSignup || userSignedUp || showDashboard ? 'transition-main' : '';

    return (
        <main className={`${mainClassName}`}>
            {!showSignup && !showDashboard && !userSignedUp && <Hero handleSignup={handleSignup}/>}
            {showSignup && <Signup handleUserSignedUp={handleUserSignedUp} handleGoToDashboard={handleGoToDashboard}/>}
            {
                userSignedUp && (
                    <Userprofile handleGoToDashboard={handleGoToDashboard} />
                )
            }
            {showDashboard && <Dashboard /> }
            {/* <div className='fullHistory mTop32'>
                <HistoryAll />
            </div> */}
            {/* <div className='userHistory mTop32'>
                <HistoryUser />
            </div> */}
        </main>
    );
}


export default Main;