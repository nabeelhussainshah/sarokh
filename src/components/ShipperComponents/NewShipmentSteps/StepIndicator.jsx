import React from "react";

export default function StepIndicator({ step1="ng-star-inserted", step2="ng-star-inserted", step3="ng-star-inserted" }) {
  return (
    <aw-wizard-navigation-bar className="horizontal small">
      <ul className="steps-indicator steps-3">
        <li className={step1}>
          <a href="#">
            <div className="label">Step 1</div>
            <div className="step-indicator"></div>
          </a>
        </li>
        <li className={step2}>
          <a href="#">
            <div className="label">Step 2</div>
            <div className="step-indicator"></div>
          </a>
        </li>
        <li className={step3}>
          <a href="#">
            <div className="label">Step 3</div>
            <div className="step-indicator"></div>
          </a>
        </li>
      </ul>
    </aw-wizard-navigation-bar>
  );
}
