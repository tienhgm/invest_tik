export default function getIsLoggedIn() {
    return JSON.parse(JSON.parse(localStorage.getItem("persist:root")!).auth.isLoggedIn)
}