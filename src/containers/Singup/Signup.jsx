import './signup.css';


const Signup = props => {
    return (
        <div className='signupSection'>
            <div className='signupSection--form'>
                <h3>
                    Create an account
                </h3>
                <div>
                    <label>Username</label>
                    <br />
                    <input  />
                </div>
                <div className='signupSection--form-btn'>
                    Sign Up
                </div>
                <div className='text-13 signupsection--form-selectUser'>
                    Already have an accout? <span className='signupsection--form-selectUserLink'>Go to Dashboard</span>
                </div>
            </div>
            <div className='signupSection--form--line'></div>
        </div>
    );
}

export default Signup;