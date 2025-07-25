import { useWidgetConfigContext } from './WidgetConfigContext';
import { getCurrentAvailableParameters, isDataSelectionNumberValid } from '../../../utils/widget/widgetUtils';

export const fintelTemplateVariableNameChecker = /^[A-Za-z0-9_-]+$/;

const useWidgetConfigValidateForm = () => {
  const { context, config, step, fintelWidgets } = useWidgetConfigContext();
  const { type, parameters, dataSelection } = config.widget;

  const alreadyUsedVariables = (fintelWidgets ?? [])
    .filter((w) => w.variable_name !== config.fintelVariableName)
    .flatMap(({ widget, variable_name }) => {
      if (widget.type !== 'attribute') return variable_name;
      return (widget.dataSelection[0].columns ?? []).flatMap((c) => c.variableName ?? []);
    });

  const isDataSelectionAttributesValid = () => {
    for (const d of dataSelection) {
      if (d.attribute?.length === 0) return false;
    }
    return true;
  };

  const isVarNameAlreadyUsed = (varName?: string | null) => {
    return alreadyUsedVariables.includes(varName ?? '')
      || (config.widget.dataSelection[0].columns ?? []).filter((c) => c.variableName === varName).length > 1;
  };

  // ======================
  // === List of checks ===
  // ======================

  // Check we are at the last step
  const isLastStep = step === 3;
  // Check there is a type
  const isTypeFilled = !!type && type !== '';

  // Check the number of results is lower than 100 for lists
  const isDataSelectionNumberCheck = isDataSelectionNumberValid(type, dataSelection);
  // Check all data selections has an attribute filled if  widget type requires it
  const isDataSelectionAttributesFilled = !getCurrentAvailableParameters(type).includes('attribute')
    || (getCurrentAvailableParameters(type).includes('attribute') && isDataSelectionAttributesValid());

  // Check variable name is filled in case of fintel
  const needVariableName = context === 'fintelTemplate' && type !== 'attribute';
  const isVariableNameFilled = !needVariableName || !!config.fintelVariableName;

  // Check variable name is valid in case of fintel
  const isVariableNameValid = (
    !config.fintelVariableName
    || fintelTemplateVariableNameChecker.test(config.fintelVariableName)
  );

  // Check title is filled in case of fintel
  const isTitleFilled = (
    (context !== 'fintelTemplate')
    || (context === 'fintelTemplate' && !!parameters?.title)
  );

  // Check if the variable name is already used in an other widget
  const isWidgetVarNameAlreadyUsed = !!config.fintelVariableName && isVarNameAlreadyUsed(config.fintelVariableName);

  return {
    isFormValid: (
      isLastStep
      && isDataSelectionNumberCheck
      && isDataSelectionAttributesFilled
      && isVariableNameFilled
      && isVariableNameValid
      && isTitleFilled
      && isTypeFilled
      && !isWidgetVarNameAlreadyUsed
    ),
    isWidgetVarNameAlreadyUsed,
    isVarNameAlreadyUsed,
    isVariableNameValid,
  };
};

export default useWidgetConfigValidateForm;
