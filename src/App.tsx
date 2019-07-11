import React from 'react';
import FolderView from './FolderView';
import FileInfo from './FileInfo';
import Viewer from './Viewer';
import TopBar from './TopBar/TopBar';
import ManifestHistory from './lib/ManifestHistory';
import Login from './Login';
import TreeViewContainer from './TreeViewContainer';
import Alert from './Alert';
import {I18nextProvider, initReactI18next} from 'react-i18next';
import i18n  from 'i18next';
import IConfigParameter from './interface/IConfigParameter';
import Config from './lib/Config';
import Cache from './lib/Cache';
const commonEn = require('./translations/en/common.json');
const commonDe = require('./translations/de/common.json');
const commonNl = require('./translations/nl/common.json');

require('./css/App.css');

interface IState {
    folderAndInfoLeft?: number;
    folderAndInfoTop?: number;
    treeViewWidth: number;
}

interface IProps {
    config: IConfigParameter;
}

declare let global: {
    config: Config;
};


class App extends React.Component<IProps, IState> {

    constructor(props: IProps) {

        super(props);

        global.config = new Config(this.props.config);

        i18n.use(initReactI18next).init({
            lng: global.config.getLanguage(),
            fallbackLng: global.config.getFallbackLanguage(),
            interpolation: { escapeValue: false },  // React already does escaping
            resources: {
                de: {
                    common: commonDe
                },
                en: {
                    common: commonEn
                },
                nl: {
                    common: commonNl
                }
            }
        });

        this.state = {
            treeViewWidth: global.config.getDefaultNavBarWith()
        };

        this.treeViewWidthChanged = this.treeViewWidthChanged.bind(this);
        this.toggleNavBar = this.toggleNavBar.bind(this);
    }

    render() {

        const contentStyle = {
            left: this.state.treeViewWidth + global.config.getSplitterWidth(this.state.treeViewWidth === 0)
        };

        return (
            <I18nextProvider i18n={i18n}>
                <div id="app">
                    <TopBar/>
                    <Login/>
                    <div id="main">
                        <TreeViewContainer width={this.state.treeViewWidth}
                                           widthChangedFunc={this.treeViewWidthChanged} />
                        <div id="content" style={contentStyle}>
                            <Viewer/>
                            <div id="folder-and-info" style={{
                                left: this.state.folderAndInfoLeft,
                                top: this.state.folderAndInfoTop
                            }}>
                                <FolderView/>
                                <FileInfo/>
                            </div>
                        </div>
                    </div>
                    <Alert />
                </div>
            </I18nextProvider>
        );
    }

    treeViewWidthChanged(width: number) {

        if (width < global.config.getMinimalNavBarWidth()) {
            width = 0;
        }

        this.setState(
            {
                treeViewWidth: width
            }
        );
    }

    toggleNavBar() {

        const treeViewWidth = this.state.treeViewWidth > 0 ? 0 : global.config.getDefaultNavBarWith();

        this.setState({treeViewWidth});
    }

    componentDidMount() {

        window.addEventListener('popstate', function(event) {
            ManifestHistory.goBack();
        });
        Cache.ee.addListener('toggle-nav-bar', this.toggleNavBar);
    }

    componentWillUnmount() {
        Cache.ee.removeListener('toggle-nav-bar', this.toggleNavBar);
    }

}

export default App;
