package com.leoric.quizz.controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @GetMapping(value = {"/", "", "/home", "/welcome"}, produces = MediaType.TEXT_PLAIN_VALUE)
    public String mainPage() {
        return "This is main page";
    }
}
