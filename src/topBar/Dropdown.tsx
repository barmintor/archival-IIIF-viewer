import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {ReactElement} from 'react';
import { Translation } from 'react-i18next';

import './dropdown.css';

export default function Dropdown(iconSvg: IconDefinition, labelKey: string, menuOptions: ReactElement[]) {
    return <details className="aiiif-dropdown">
        <summary className="aiiif-icon-button" role="button">
            <span className="aiiif-button">
                <FontAwesomeIcon icon={iconSvg} />
                <Translation ns="common">{(t, { i18n }) => <span className="label">{t(labelKey)}</span>}</Translation>
            </span>
        </summary>
        <menu className="aiiif-{labelKey}-switch-menu">
            {menuOptions}
        </menu>
    </details>;
}
