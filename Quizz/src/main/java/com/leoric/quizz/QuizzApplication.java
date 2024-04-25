package com.leoric.quizz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class QuizzApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuizzApplication.class, args);
    }

    public int addTwoNum(int num1, int num2) {
        return num1 + num2;
    }

}
