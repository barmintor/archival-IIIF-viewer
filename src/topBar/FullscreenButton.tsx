import * as React from 'react';
import './fullscreen.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExpand} from "@fortawesome/free-solid-svg-icons";
import {Translation} from 'react-i18next';
import enterFullscreen from "../lib/EnterFullscreen";

export default function FullscreenButton() {

    return <button  className="aiiif-icon-button aiiif-fullscreen-button" onClick={() => enterFullscreen()}>
            <FontAwesomeIcon icon={faExpand} />
            <Translation ns="common">{(t, { i18n }) => <span className="label">{t('toggleFullScreen')}</span>}</Translation>
    </button>;
}
