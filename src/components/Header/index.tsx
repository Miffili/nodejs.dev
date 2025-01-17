import React, { useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useTheme } from '@skagami/gatsby-plugin-dark-mode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { ReactComponent as LogoLight } from '../../images/logos/nodejs-logo-light-mode.svg';
import { ReactComponent as LogoDark } from '../../images/logos/nodejs-logo-dark-mode.svg';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useLocaleAsDropdown } from '../../hooks/useLocaleAsDropdown';
import { useAutoClosableDropdown } from '../../hooks/useAutoClosableDropdown';
import SearchBar from '../SearchBar';
import { useFeatureToggles } from '../../hooks';

const Header = (): JSX.Element => {
  const isMobile = useMediaQuery('(max-width: 870px)');

  const languageButtonRef = useRef<HTMLButtonElement>(null);

  const localeDropdownItems = useLocaleAsDropdown();

  const featureToggles = useFeatureToggles();

  const { renderDropdown, showDropdown, visible } = useAutoClosableDropdown(
    localeDropdownItems,
    languageButtonRef
  );

  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    // This is responsible for setting the color-scheme of the scroll-bars
    if (typeof document === 'object' && document.documentElement) {
      document.documentElement.style['color-scheme'] = theme;
    }
  }, [theme]);

  const handleThemeOnClick = (isKeyPress = false): void => {
    if (isKeyPress) {
      return;
    }

    toggleTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav aria-label="Primary" className="nav">
      <div className="nav__container">
        <div className="nav__startwrapper">
          <Link to="/" aria-label="Homepage">
            <div className="logo">
              <LogoLight className="nav__logo light-mode-only" />
              <LogoDark className="nav__logo dark-mode-only" />
            </div>
          </Link>
        </div>

        <ul className="nav__tabs__container">
          <li className="nav__tabs">
            <Link
              to="/learn"
              className="activeStyleTab"
              activeClassName="active"
              partiallyActive
            >
              <FormattedMessage id="components.header.links.learn" />
            </Link>
          </li>
          <li className="nav__tabs">
            <a
              className="activeStyleTab"
              target="_blank"
              href="https://nodejs.org/en/docs/"
              rel="noopener noreferrer"
            >
              <FormattedMessage
                id="components.header.links.docs"
                values={{ isMobile }}
              />
            </a>
          </li>
          <li className="nav__tabs">
            <Link
              to="/download"
              className="activeStyleTab"
              activeClassName="active"
              partiallyActive
            >
              <FormattedMessage id="components.header.links.download" />
            </Link>
          </li>
          <li className="nav__tabs">
            <Link
              to="/community"
              className="activeStyleTab"
              activeClassName="active"
              partiallyActive
            >
              <FormattedMessage id="components.header.links.community" />
            </Link>
          </li>
        </ul>

        <div className="nav__endwrapper">
          <ul className="right-container">
            <li className="nav__tabs search-bar">
              <span className="sr-only">Search Bar</span>
              <SearchBar />
            </li>

            <li className="nav__tabs">
              <button
                type="button"
                className="dark-mode-toggle"
                onClick={() => handleThemeOnClick()}
                onKeyPress={() => handleThemeOnClick(true)}
              >
                <span className="sr-only">Toggle Dark Mode</span>
                <i className="material-icons light-mode-only theme-buttons">
                  mode_night
                </i>
                <i className="material-icons dark-mode-only theme-buttons">
                  brightness_medium
                </i>
              </button>
            </li>

            {featureToggles.has('i18n-language-selector') && (
              <li className="nav__tabs">
                <button
                  type="button"
                  className="language-switch"
                  ref={languageButtonRef}
                  onClick={() => showDropdown(!visible)}
                >
                  <span className="sr-only">Switch Language</span>
                  <i className="material-icons theme-buttons">translate</i>
                </button>
                {renderDropdown}
              </li>
            )}

            <li className="nav__tabs">
              <a
                target="_blank"
                href="https://github.com/nodejs/nodejs.dev"
                rel="noopener noreferrer"
              >
                <span className="sr-only">GitHub</span>
                <FontAwesomeIcon
                  icon={faGithub}
                  color="var(--color-text-accent)"
                  style={{ padding: '1rem', width: '2rem', height: '2rem' }}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
