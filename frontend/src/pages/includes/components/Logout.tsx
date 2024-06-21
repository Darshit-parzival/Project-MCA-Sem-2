const Logout = () => {
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('id');
        window.location.href = '/login';
        return(
                <></>
        );
      
};
export default Logout;
