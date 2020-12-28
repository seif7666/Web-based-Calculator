package cse.calculator;

import java.util.Stack;

public class Calculator implements ICalculator {



    @Override
    public String singleOperation(String operation, String operator) {
        double result;
        try {
            result = getResult(operation + "\n");
        }catch (Exception e) {
            return "E";
        }
        switch(operator){
            case "sqrt(x)": if (result <0) return "E";result = Math.sqrt(result);break;
            case "1/x":if (result ==0) return "Division by 0";result = 1/result;break;
            case "xx" :result = result*result;
        }
        return result + "";
    }

    @Override
    public String normalOperation(String operation) {
        double result;
        try {
            result = getResult(operation + "\n");
            return result+"";
        }catch (Exception e){
            System.out.println(e);
            return e.getMessage();
        }
    }
    private double getResult(String operation){
        Stack<String> results = new Stack<>();
        String number = "";
        for (int i = 0 ;i<operation.length() ; i++){
            char character = operation.charAt(i);
            System.out.println(i+"\t"+character);
            if(isNumber(character))
                number +=character;
            else{//operator
                if(number.equals("") ){
                    if(character != '-')
                        throw new RuntimeException("Invalid operation line 50");
                    number += character;//Number is negative.
                }
                else{//Valid operator
                    if(results.isEmpty() || (results.peek().equals("+") || results.peek().equals("-"))){
                        results.push(checkDouble(number) + ""); //To check that number is valid
                    }
                    else{//peek is x or /
                        char operator = results.pop().charAt(0);//operator
                        double operand1 = checkDouble(results.pop());
                        double operand2 = checkDouble(number);
                        switch (operator) {
                            case 'x':
                                results.push((operand1 * operand2) + "" );
                                break;
                            case '/':
                                if(operand2 != 0){
                                    results.push((operand1 / operand2) + "");
                                }else{
                                    throw new RuntimeException("Division by 0");
                                }
                                break;
                        }
                    }
                    number = ""; //Restart number
                    if (character != '\n') {
                        results.push(character + "");
                    }
                }
            }
        }
        //Now we begin subtraction and addition process.
        double result = 0;


        while(!results.isEmpty()){
            double op1 = checkDouble(results.pop());
            if(!results.isEmpty()){
                char op = results.pop().charAt(0);//operation
                double op2 = checkDouble(results.pop());
                double subResult = op2;
                if(op =='+')
                    subResult += op1;
                else
                    subResult -= op1;
                results.push(subResult + "");
            }
            else
                result = op1;
        }
        return result;
    }

    private boolean isNumber(char num){
        if ((num >= '0' && num <='9' )|| num =='.' )
            return true;
        return false;
    }
    private boolean isOperator(String op){
        return op.equals("+") || op.equals("x") || op.equals("/") || op.equals("-") || op.equals("\n");
    }
    private double checkDouble(String number){
        return Double.parseDouble(number);
    }
}
