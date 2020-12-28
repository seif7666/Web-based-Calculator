package cse.calculator;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin
@RestController //localhost:8080
public class Controller {

    private ICalculator calculator = new Calculator();

    @GetMapping("/normal")
    public String normalOperation(@RequestParam(name = "operation", required = true) String operation){
        System.out.println(operation);
        return calculator.normalOperation(operation);
    }
    @GetMapping("/single")
    public String singleOperation(@RequestParam(name = "operation") String operation , @RequestParam(name = "type") String type){
        System.out.println(operation + "\t" + type);
        return calculator.singleOperation(operation, type);
    }

}
