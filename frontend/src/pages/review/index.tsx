import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Review from './Review'

const Index = () => {
    let { path, url } = useRouteMatch()

    return (
        <div>
            <Switch>
                <Route exact path={`${path}/@:id`} component={Review} />
                <Route path={`${path}/new`} component={Review} />
                {/* TODO: 404必要？ */}
            </Switch>
        </div>
    )
}

export default Index
