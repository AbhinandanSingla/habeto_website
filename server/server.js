import {initializeApp} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";
import {getFirestore, doc, setDoc} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCyQ0w52fukK9pFZwFGi0hjJC3Bmtd7jII",
    authDomain: "food-a357f.firebaseapp.com",
    databaseURL: "https://food-a357f.firebaseio.com",
    projectId: "food-a357f",
    storageBucket: "food-a357f.appspot.com",
    messagingSenderId: "536964299758",
    appId: "1:536964299758:web:12ffcb5c4f8f30404e2cff",
    measurementId: "G-HJYWY27S83"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore();
// function adduser(email,pass){
//     createUserWithEmailAndPassword(auth, 'email123222@gmail.com', 'password123')
//         .then((userCredential) => {
//             // Signed in
//             const user = userCredential.user;
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//         });
// }
// const auth = getAuth(app);
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

async function addUser(id, data) {
    await setDoc(doc(db, 'users', id), data);
}

$(document).ready(() => {
    $('#r_submit').click(() => {
        let email = $('#email').val();
        let name = $('#name').val();
        let city = $('#city').val();
        let mobile = $('#mobile').val();
        console.log(email)
        if (isEmail(email)) {
            if (name !== '') {
                if (city !== '') {
                    addUser('alphabetagama', {
                        email: email,
                        name: name,
                        city: city,
                        mobile: mobile,
                        plan: sessionStorage.getItem('plan')
                    }).then(r => {
                        alert('Registered Successfully');
                        $('#registration').css('display', 'none');
                        $('.nav-btn').css('display', 'none');
                    })
                        .catch(e => alert('Something went wrong please refresh and try again')
                        )
                } else {
                    alert('please enter your city')
                }
            } else {
                alert('please enter your name')
            }
        } else {
            alert('please check your email')
        }
    });
})
