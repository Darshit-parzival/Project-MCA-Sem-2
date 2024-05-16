const Logout = () => {
        sessionStorage.removeItem('name');
        window.location.href = '/login';
        return(
                <></>
        );
      
};
export default Logout;
