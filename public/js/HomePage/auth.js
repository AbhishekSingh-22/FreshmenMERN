    function Logout(){
        fetch("http://localhost:3500/auth/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicates the request body format
            }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parses the response body as JSON
        })
        .then(data => {
            alert("You have been logged out!")
            addAuthBtns(); // Handle the JSON response data
        })
        .catch(error => {
            console.error('Error:', error); // Handle any errors
        });
    
      }




// Adding Auth Buttons 
function addAuthBtns(){
fetch("http://localhost:3500/auth/isAuthenticated")
.then(res => res.json())
.then(data => {
    let authBtnsResponsive = document.querySelector("#authBtnsResponsive")
    let authBtns = document.querySelector("#authBtns")
    let signUp = document.querySelector("#SignUpBtn")
    let signIn = document.querySelector("#SignInBtn")
    html =``;
    if (data.isAuthenticated){
    html = `<a onClick = "Logout()"><button type="button">Sign out</button></a>`
    } else {
    html = `<button type="button" onclick="openForm()">Sign in</button>`
    }

    signIn.addEventListener("click", function (e){
        // Sending the POST request
        e.preventDefault()
        

        let email = document.querySelector("#email2");
        let password = document.querySelector("#password2");
    
        // Data to be sent in the request
        const data = {
            email: email.value,
            password: password.value
        };
    
        console.log(data)
    
        // Options for the fetch request
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicates the request body format
            },
            body: JSON.stringify(data) // Converts the JavaScript object into a JSON string
    };
    
    
        fetch("http://localhost:3500/auth/login", options)
            .then(response => {
                if(response.status === 400) {
                    alert("Please provide both email and password")
                    throw "Error"
                }
                if (response.status === 404) {
                    alert(`No user with email: ${email.value} found`)
                    throw "Error"
                }
                if (response.status === 401) {
                    alert("Wrong password");
                    throw "Error"
                }
                return response.json(); // Parses the response body as JSON
            })
            .then(data => {
                let popup=document.querySelector(".popup");
                popup.classList.add("hidden");
                email.value = "";
                password.value = "";

                alert(`Welcome ${data.user.username}`);

                if (data) addAuthBtns();
            })
            .catch(error => {
                console.log(error)// Handle any errors
            });
        
          })

    
    signUp.addEventListener("click", function (e){
        // Sending the POST request
        e.preventDefault()
        

        let email = document.querySelector("#email1");
        let password = document.querySelector("#password1");
        let username = document.querySelector("#username");
        let confirmPassword = document.querySelector("#confirmPassword")
    
        // Data to be sent in the request
        const data = {
            username: username.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        };
    
        // Options for the fetch request
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicates the request body format
            },
            body: JSON.stringify(data) // Converts the JavaScript object into a JSON string
    };
    
    
        fetch("http://localhost:3500/register", options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json(); // Parses the response body as JSON
            })
            .then(data => {
                if (data.status === 201){
                
                let popup=document.querySelector(".popup");
                popup.classList.add("hidden");
                email.value = "";
                password.value = "";
                username.value = "";
                confirmPassword.value = "";

                alert(`${data.message}`);

                addAuthBtns();
                } else{
                    alert(`${data.message}`);
                }

            })
            .catch(error => {
                console.error('Error:', error); // Handle any errors
            });
        
          })
  
          authBtns.innerHTML = html;
          authBtnsResponsive.innerHTML = html;
        })
.catch((error)=> console.log(error))
}

addAuthBtns();




