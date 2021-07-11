import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Mypage from './pages/Mypage'
import NotFound from './pages/NotFound'
import SignIn from './pages/SignIn'
import Top from './pages/Top1'
import BrandLogo from './components/BrandLogo'
import Index from './pages/review'
import Delete from './pages/Delete'

import { AuthProvider } from './lib/AuthProvider'
import InviteReview from './pages/InviteReview'
import CreateLink from './pages/ CreateLink'

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <BrowserRouter>
                    <BrandLogo />
                    <div className="mainBody">
                        <Switch>
                            <Route exact path="/" component={Top} />
                            <Route exact path="/signin" component={SignIn} />
                            {/* TODO: reviewsはnestさせて/reviews/newってする */}
                            {/* <Route exact path="/reviews" component={SignIn} /> */}
                            <Route path="/@:id" component={Mypage} />
                            <Route path="/review" component={Index} />
                            {/* BOOKTREE削除ページのルーティングを追加した */}
                            <Route path="/delete" component={Delete} />
                            {/* 招待リンクをアクセスしたときのやつ↓ これで良い？ */}
                            <Route path="/invitation" component={InviteReview} />
                            {/* 招待リンク作るところ */}
                            <Route path="/createLink" component={CreateLink} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                    <Footer />
                </BrowserRouter>
            </div>
        </AuthProvider>
    )
}

export default App
