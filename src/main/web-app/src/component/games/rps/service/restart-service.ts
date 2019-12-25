export const restIfNotAthenticated = (props: any) => {
    if (!props.authenticationState.isAuthenticated) {
        props.history.push('/');
    }
};