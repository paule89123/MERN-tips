import React from 'react'

function Register(props) {
    return (
        <div className="App">

            {!props.loggedIn &&

                <div>
                    <span style={{fontWeight: "500"}}>If you would like to write an article for <span style={{fontSize: "14px", fontWeight: "900", letterSpacing: "1px"}}>MERN TIPS</span>, please register below and complete the coding challenge to prove that you are a coder.</span>
                    <br /><br /><br />
                    <div style={{fontSize:"32px"}}>Register</div>
                    <form onSubmit={props.register}>
                        <br />
                        <div className="input-container">
                            <input onChange={props.onChangeName} value={props.name} placeholder=" " type="name" id="name" name="name" autoComplete="off" required />
                            <label for="name">
                                <span className="label-content">Name</span>
                            </label>
                        </div>

                        <br />

                        <div className="input-container">
                            <input onChange={props.onChangeEmail} value={props.email} placeholder=" " type="email" id="email" name="email" autoComplete="off" required />
                            <label for="email">
                                <span className="label-content">Email address</span>
                            </label>
                        </div>

                        <br />

                        <div className="input-container">
                            <input onChange={props.onChangePassword} value={props.password} placeholder=" " type="password" id="password" name="password" required />
                            <label for="password">
                                <span className="label-content">Create password</span>
                            </label>
                        </div>

                        <br />

                        <div className="input-container">
                            <input onChange={props.onChangePassword2} value={props.password2} placeholder=" " type="password" id="password2" name="password2" required />
                            <label for="password2">
                                <span className="label-content">Confirm password</span>
                            </label>
                        </div>

                        <br /><br />

                        <span style={{fontWeight: "500"}}>What will be the output of the following code?</span>
                        <br /><div style={{fontFamily: "Courier, sans-serif", padding: "4px", margin: "9px 0px 0px 0px", backgroundColor: "rgba(255,255,255,0.1)", display: "inline-block", borderRadius: "4px"}}>console.log(typeof undefined == typeof NULL)</div>
                        <br /><br />
                        <div className="input-container">
                            <input onChange={props.onChangeAnswer} value={props.answer} placeholder=" " type="text" id="answer" name="answer" autoComplete="off" required />
                            <label for="answer">
                                <span className="label-content">Answer</span>
                            </label>
                        </div>

                        <br />

                        <div className="input-container">
                              <input type="submit" name="submit" value="Register" id="submit" />
                        </div>

                    </form> 

                </div>
            }

            {props.justregistered &&
                <div>
                    <h1 style={{margin: "0px"}}>
                        Welcome <br />{props.name}
                    </h1>
                    <br />
                    <h3> 
                        <br />
                        Thank you for registering. Please wait while we return you to the homepage...
                    </h3>
                </div>
            }

            {props.loggedIn &&  !props.justregistered &&
                <div>
                    <div style={{fontSize: "20px"}}>You are currently logged in as:</div>
                    <div style={{fontSize: "32px"}}>{props.name}</div>
                    <div style={{fontSize: "20px", fontWeight: "400", color: "rgb(157,157,172)"}}>{props.email}</div>
                    <br /><br />
                    <div style={{fontWeight: "500"}}>If you would like to contribute a post, click 'Create Post' in the sidebar.</div>
                </div>
            }

        </div>
    )
}

export default Register