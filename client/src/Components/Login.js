import React from 'react'

function Login(props) {
    return (
        <div className="App">

            {!props.loggedIn &&
                <div>
                    <div style={{fontSize:"32px"}}>Login</div>

                    <form onSubmit={(e) => {
                        e.preventDefault()
                        props.login(props.fromLocation)
                    }}>
                        <br />

                        <div className="input-container">
                            <input onChange={props.onChangeEmail} value={props.email} placeholder=" " type="email" id="email" name="email" autoComplete="off" required />
                            <label for="email">
                                <span className="label-content">Email address</span>
                            </label>
                        </div>

                        <br />

                        <div className="input-container">
                            <input onChange={props.onChangePassword} value={props.password} placeholder=" " type="password" id="password" name="password" autoComplete="off" required />
                            <label for="password">
                                <span className="label-content">Password</span>
                            </label>
                        </div>

                        <br />

                        <div className="input-container">
                              <input type="submit" name="submit" value="Login" id="submit" />
                        </div>

                    </form> 
                </div>
            }

            {props.loggedIn && props.name && props.email &&
                (<div>
                    <div style={{fontSize: "20px"}}>Welcome</div>
                    <div style={{fontSize: "32px"}}>{props.name}</div>
                    <div style={{fontSize: "20px", fontWeight: "500", color: "rgb(157,157,172"}}>{props.email}</div>
                    <br /><br />
                    <div style={{fontWeight: "500"}}>Please wait while we return you to the homepage...</div>
                </div>)
            }

        </div>
    )
}

export default Login