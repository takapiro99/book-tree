import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Review from './Review'
import Form from './Form'

const Index = () => {
    let { path } = useRouteMatch()
    // console.log(path) .com/review//new
    return (
        <div>
            <Switch>
                <Route exact path={`${path}/@:id`} component={Review} />
                <Route path={`${path}/new`} component={Form} />
                {/* TODO: 404必要？ */}
            </Switch>
        </div>
    )
}

export default Index
