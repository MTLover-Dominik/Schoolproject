import { navigate } from "./navigateFunction.js";

document.getElementById('headerIcon').addEventListener('click', () => {
    console.log("Icon was clicked");
    navigate('/dashboard');
});