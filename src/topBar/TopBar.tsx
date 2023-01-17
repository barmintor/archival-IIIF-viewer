import * as React from 'react';
import Cache from '../lib/Cache';
import LanguageSwitcher from './LanguageSwitcher';
import {Translation} from 'react-i18next';
import './topbar.css';
import Token from "../lib/Token";
import ExternalSearch from "./ExternalSearch";
import FullscreenButton from "./FullscreenButton";
import {isSingleManifest} from "../lib/ManifestHelpers";
import {useContext} from "react";
import {AppContext} from "../AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

export default function TopBar() {

    const {currentManifest} = useContext(AppContext);

    return <div className="aiiif-topbar">
        {(currentManifest && !isSingleManifest(currentManifest)) &&
            <button className="aiiif-icon-button" onClick={() => Cache.ee.emit('toggle-splitter-main')}>
                <FontAwesomeIcon icon={faList} />
                <Translation ns="common">{(t, { i18n }) => <span className="label">{t('navBar')}</span>}</Translation>
            </button>
        }
        <LanguageSwitcher />
        <ExternalSearch />
        {Token.hasActiveToken() &&
            <button className="aiiif-icon-button" onClick={() => Token.logout()}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <Translation ns="common">{(t, { i18n }) => <span className="label">{t('logout')}</span>}</Translation>
            </button>
        }
       <FullscreenButton />
    </div>;
}
