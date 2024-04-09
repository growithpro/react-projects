import React, { Component, useEffect, useRef, useState } from "react";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const CONFIG_INFO = [
    {
      name: "Customer Info",
      Component: () => <div>Customer Information</div>,
    },
    {
      name: "Shipping Info",
      Component: () => <div>Shipping Information</div>,
    },
    {
      name: "Payment",
      Component: () => <div>Payment Information</div>,
    },
    {
      name: "Delivered",
      Component: () => <div>Delivery Information</div>,
    },
  ];

  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[currentStep - 1].offsetWidth / 2,
      marginRight: stepRef.current[CONFIG_INFO.length - 1].offsetWidth / 2,
    });
    console.log(margins.marginLeft, margins.marginRight);
  }, [stepRef, CONFIG_INFO.length]);

  const handleSteps = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === CONFIG_INFO.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };
  const ActiveComponent = CONFIG_INFO[currentStep - 1]?.Component;

  const calculateProgressWidth = () => {
    // console.log(stepRef.current);
    return ((currentStep - 1) / (CONFIG_INFO.length - 1)) * 100;
  };

  return (
    <>
      <div className="stepper">
        {CONFIG_INFO.map((step, index) => {
          return (
            <div
              key={step.name}
              ref={(el) => (stepRef.current[index] = el)}
              className={`step ${
                currentStep > index + 1 || isComplete ? "complete" : ""
              } ${currentStep === index + 1 ? "active" : ""}`}
            >
              <div className="stepno">
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="stepname">{step.name}</div>
            </div>
          );
        })}

        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: `${margins.marginLeft}px`,
            marginRight: `${margins.marginRight}px`,
          }}
        >
          <div
            className="progress"
            style={{ width: `${calculateProgressWidth()}%` }}
          ></div>
        </div>
      </div>
      <ActiveComponent />
      {!isComplete && (
        <button className="btn" onClick={handleSteps}>
          {currentStep === CONFIG_INFO.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
};

export default Checkout;
