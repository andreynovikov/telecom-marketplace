import UserHeaderArea from '@/components/user/header-area'

import Logo from './logo'
import MainMenu from './main-menu'

export default function Header() {
    return (
        <header>
            <div className="menu-area">
                <div className="top-menu-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-6 v_middle">
                                <Logo />
                            </div>
                            <div className="col-lg-8 offset-lg-1 col-md-9 col-6 v_middle">
                                <UserHeaderArea />
                            </div>
                        </div>
                    </div>
                </div>
                <MainMenu />
            </div>
        </header>
    )
}
