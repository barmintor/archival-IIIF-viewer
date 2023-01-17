import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLanguage} from "@fortawesome/free-solid-svg-icons";
import Config from '../lib/Config';
import Dropdown from './Dropdown';
import {ReactElement, useState} from 'react';
import i18n from 'i18next';

declare let global: {
    config: Config;
};

export default function LanguageSwitcher() {

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    if (global.config.getDisableLanguageSelection()) {
        return <></>;
    }

    const open = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const close = () => {
        setAnchorEl(null);
    }

    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setAnchorEl(null);
    }

    const languages: ReactElement[] = [];
    const translations = global.config.getTranslations();
    for (const i in translations) {

        if (!translations.hasOwnProperty(i)) {
            continue;
        }

        languages.push(<li key={i} onClick={() => changeLanguage(i)}>{translations[i]}</li>);
    }

    return Dropdown(faLanguage, 'language', languages);
}


