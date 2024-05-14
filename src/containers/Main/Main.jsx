
import './main.css';
import Hero from '../Hero/Hero'
import Signup  from '../Singup/Signup';
import Userprofile from '../Userprofile/Userprofile';
import Dashboard from '../Dashboard/Dashboard';

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
        </main>
    );
}


export default Main;