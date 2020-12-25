import React from "react";
import { useTranslation } from 'react-i18next';

export default function StepIndicator({ step1="", step2="", step3="" }) {
  const { t } = useTranslation();
  return (
    <div className="horizontal small">
      <ul className="steps-indicator steps-3">
        <li className={step1}>
          <a href="#">
            <div className="label">&nbsp;&nbsp;&nbsp;{t('Step 1')}</div>
            <div className="step-indicator"></div>
          </a>
        </li>
        <li className={step2}>
          <a href="#">
            <div className="label">&nbsp;&nbsp;&nbsp;{t('Step 2')}</div>
            <div className="step-indicator"></div>
          </a>
        </li>
        <li className={step3}>
          <a href="#">
            <div className="label">&nbsp;&nbsp;&nbsp;{t('Step 3')}</div>
            <div className="step-indicator"></div>
          </a>
        </li>
      </ul>
    </div>
  );
}
