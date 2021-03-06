type authInfoFromServlet = {
    loginUrl: string;
    logoutUrl: string;
    hasProfile: boolean;
};

//function that loads the home page for logging in and logging out
async function loadHome() {
    const logging = document.getElementById('navbarResponsive');
    const link = document.getElementById('login-link');
   
    const logStatus = await logStatusMethod();

    if(logStatus.hasProfile == false && logStatus.loginUrl == ""){
        document.location.href = "/profileBuilder.html";
    }

    //set up function to set login/logout link based on which string is non empty
    if (link && logging) {
        if (logStatus.loginUrl === "") {
            link.setAttribute('href', logStatus.logoutUrl);
            link.innerHTML = 'Log Out';
        } else {
            link.setAttribute('href', logStatus.loginUrl);
            link.innerHTML = 'Log In';
            
        }
    }
}

async function logStatusMethod(): Promise<authInfoFromServlet> {
    const response = await fetch('/userapi');
    const currentStatus = await response.json();
    let authStatus: authInfoFromServlet = { loginUrl: currentStatus.LogInUrl, logoutUrl: currentStatus.LogOutUrl, hasProfile: currentStatus.HasProfile };
    return authStatus;
}

window.onload = () => {
    loadHome();
}