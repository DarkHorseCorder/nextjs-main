const comparisonOperators = ["=", ">", "<", ">=", "<=", "<>"];
const logicalOperators = [
  "ALL",
  "ANY",
  "BETWEEN",
  "EXISTS",
  "IN",
  "LIKE",
  "NOT",
  "SOME",
]; // subtracting "OR" and "AND"

function isContainOperator(expression: string) {
  //contain comparison operator
  for (const compOperator of comparisonOperators) {
    if (expression.indexOf(compOperator) >= 0) return 1;
  }

  //contain logical operator
  for (const logicOperator of logicalOperators) {
    if (expression.toUpperCase().indexOf(logicOperator) >= 0) return 2;
  }

  //do not contain any operator
  return 0;
}

//check if the single expression is the valid expression
function isSingleExpression(expression: string) {
  //it must include one of the operator

  const operatorType = isContainOperator(expression);
  if (operatorType === 0) return false;
  if (operatorType === 1) {
    //comparison operator, in this case the number of operands must be 2,
    let index, operatorLength;
    for (const compOperator of comparisonOperators) {
      index = expression.indexOf(compOperator);
      if (index >= 0) {
        operatorLength = compOperator.length;
        break;
      }
    }

    const leftExpression = expression.slice(0, index).trim();
    const rightExpression = expression.slice(index + operatorLength).trim();

    if (leftExpression.length === 0 || rightExpression.length === 0)
      return false;
    return true;
  }
  return true;
}

function isValidExpression(expression: string): boolean {
  expression = expression.trim();
  const length = expression.length; //length of the expression

  if (length === 0) return false;

  let count = 0; //state of the bracket, If we meet
  for (let i = 0; i < length; i++) {
    if (expression[i] === "(") count++;
    if (expression[i] === ")") count--;

    if (count === 0 && expression[i] === "O" && expression[i + 1] === "R") {
      const leftExpression = expression.slice(0, i);
      const rightExpression = expression.slice(i + 2);
      return (
        isValidExpression(leftExpression) && isValidExpression(rightExpression)
      );
    }

    if (
      count === 0 &&
      expression[i] === "A" &&
      expression[i + 1] === "N" &&
      expression[i + 2] === "D"
    ) {
      const leftExpression = expression.slice(0, i);
      const rightExpression = expression.slice(i + 3);
      return (
        isValidExpression(leftExpression) && isValidExpression(rightExpression)
      );
    }
  }

  if (count !== 0) return false;
  if (expression[0] === "(" && expression[length - 1] === ")") {
    const tempExpression = expression.slice(1, length - 1);
    return isValidExpression(tempExpression);
  }

  return isSingleExpression(expression);
}

export const formRequired = (field: string) => (value: any) => {
  if (!value || !value.length) return `${field} is required`;
  return undefined;
};

export const roleCalssesValidate = (value: any, values: any) => {
  const rolesValue = values.roles;
  if ((!value || !value.length) && (!rolesValue || !rolesValue.length))
    return "Role Classes is required";
  return undefined;
};

export const expressionValidation = (field: string) => (value: string) => {
  if (!value) return undefined;
  if (!isValidExpression(value)) return `${field} is invalid`;
  return undefined;
};

export const databaseValidate = (value: string) => {
  const regex = /^[a-zA-Z0-9_]*$/g;
  if (!value || !value.length) return `Database name is required`;
  if (!regex.test(value)) return "Letters, numbers, and underscores only";
  return undefined;
};

export const newPasswordValidation = (value: any, values: any) => {
  const { current_password } = values;
  const regex = /^(?=.*[A-Za-z])(?=.*[.,\/#!$%\^&\*;:{}=\-_`~()]).{8,}$/;
  if (!value || !value.length) return "New Password is requried";
  if (value === current_password)
    return "New password must be different than current password";
  if (value.length < 8 || !regex.test(value))
    return "Must be at least 8 characters and contain punctuation";
  return undefined;
};

export const confirmPasswordValidation = (value: any, values: any) => {
  const { new_password } = values;
  if (value !== new_password) return "Passwords must match";
  return undefined;
};
