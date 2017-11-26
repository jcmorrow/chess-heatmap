import classnames from 'classnames';
import React from 'react';

const classes = (setting) => (
  classnames('pure-button', { 'pure-button-active': setting })
);

const SettingsForm = (props) => (
  <div id="settings" className="pure-button-group">
    <div
      className={classes(props.settings.showWhiteThreatens)}
      onClick={() => (props.clickOnSetting('showWhiteThreatens'))}>
      Show White Controlled Squares
    </div>
    <div
      className={classes(props.settings.showBlackThreatens)}
      onClick={() => (props.clickOnSetting('showBlackThreatens'))}>
      Show Black Controlled Squares
    </div>
    <div
      className={classes(props.settings.showPieces)}
      onClick={() => (props.clickOnSetting('showPieces'))}>
      Show Pieces
    </div>
  </div>
);

export default SettingsForm;
