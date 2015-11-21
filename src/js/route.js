// normal react-router configure
export default routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Content} />
        <Route path='home' component={Content} />
        <Route path='edit' component={Editor} />
        <Route path='article/:id' component={Article} />
    </Route>
);
